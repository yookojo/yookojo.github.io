(function(){"use strict";const m=["0.29.5","0.27.8"],l=String.raw`
import time, json, sympy
from sympy import *
import re as _re
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application, convert_xor, rationalize
_T = standard_transformations + (implicit_multiplication_application, convert_xor, rationalize)
x = Symbol('x')
_G = {}
exec('from sympy import *', _G)
_L = {'x': x}

def _p(s):
    s = _re.sub(r'(\d)\s*x', r'\1*x', s)
    s = s.replace('[[', 'Matrix([[').replace(']]', ']])')
    return parse_expr(s, local_dict=_L, global_dict=_G, transformations=_T)

def _c(v):
    if isinstance(v, MatrixBase):
        return v.applyfunc(simplify)
    v = simplify(v)
    if v.is_polynomial(x):
        v = expand(v)
    return v

def _fmt(v):
    if isinstance(v, MatrixBase):
        return '[[' + '], ['.join(', '.join(_fmt(e) for e in row) for row in v.tolist()) + ']]'
    return sstr(v).replace('**', '^')

def _check(a, b, tol):
    e = _p(a)
    t0 = time.perf_counter()
    try:
        g = _p(b)
    except Exception:
        return json.dumps({'err': 'sympy could not parse that', 'ms': (time.perf_counter() - t0) * 1000})
    if not isinstance(g, (Basic, MatrixBase)):
        return json.dumps({'err': 'sympy could not parse that', 'ms': (time.perf_counter() - t0) * 1000})
    note = ''
    try:
        em, gm = isinstance(e, MatrixBase), isinstance(g, MatrixBase)
        if em != gm or (em and e.shape != g.shape):
            ok = False
            note = 'expected a 2x2 matrix' if em else 'expected a single expression'
        else:
            d = simplify(e - g)
            if isinstance(d, MatrixBase):
                ok = all(v == 0 for v in d)
            else:
                ok = d == 0 or bool(tol and d.is_number and abs(d) <= tol)
                if ok and d != 0:
                    note = 'within rounding of your decimals'
    except Exception as ex:
        return json.dumps({'err': 'sympy: ' + type(ex).__name__, 'ms': (time.perf_counter() - t0) * 1000})
    ms = (time.perf_counter() - t0) * 1000
    try:
        canon = _fmt(_c(g))
    except Exception:
        canon = _fmt(g)
    return json.dumps({'ok': bool(ok), 'ms': ms, 'canon': canon, 'want': _fmt(_c(e)), 'note': note})
`;let e=null,n="pyodide";const p=()=>performance.getEntriesByType("resource").reduce((o,t)=>o+(t.decodedBodySize||t.encodedBodySize||t.transferSize||0),0)/1048576,c=setInterval(()=>postMessage({type:"progress",mb:p(),stage:n}),250);async function y(){const o=performance.now(),t=[];for(const r of m)try{const s=`https://cdn.jsdelivr.net/pyodide/v${r}/full/`;n="pyodide "+r;try{importScripts(s+"pyodide.js")}catch(a){t.push(r+": "+a.message);continue}e=await self.loadPyodide({indexURL:s,stdout:()=>{},stderr:()=>{}}),n="sympy",await e.loadPackage("sympy",{messageCallback:()=>{},errorCallback:()=>{}}),e.runPython(l),e.runPython("_check('2*x + 2', '2(x+1)', 0)"),clearInterval(c),postMessage({type:"ready",pyodide:r,sympy:e.runPython("sympy.__version__"),mb:p(),ms:performance.now()-o});return}catch(s){t.push(r+": "+String(s&&s.message||s).slice(-300)),e=null;break}clearInterval(c),postMessage({type:"error",msg:t.join(" | ")})}self.onmessage=o=>{const{id:t,want:r,given:s,tol:a}=o.data;if(!e){postMessage({type:"result",id:t,err:"sympy is not ready"});return}try{e.globals.set("_a",r),e.globals.set("_b",s),e.globals.set("_tol",a||0),postMessage({type:"result",id:t,...JSON.parse(e.runPython("_check(_a, _b, _tol)"))})}catch(i){const d=String(i&&i.message||i).split(`
`).filter(Boolean).pop()||"error";postMessage({type:"result",id:t,err:"sympy: "+d.slice(0,140)})}},y()})();
