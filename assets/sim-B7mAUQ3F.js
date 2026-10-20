import{S as j}from"./dot-BtYrZRi7.js";import"./index-yogWU__4.js";import"./ai-_1ZzKa_D.js";import"./share-CAmiudsG.js";const y={"/root/test.lua":`print("hello from lua")
`,"/root/.ash_history":"","/home/guest/notes/todo.txt":`learn rust. call mom. ship it.
`,"/home/guest/.config/.dot/.flag":`FLAG{dotfiles_hide_in_plain_sight}
`,"/var/log/agent.log":`[boot] dot-agentd 0.3 starting
[auth] guest session opened
[auth] session token=RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259
[sync] no network, skipping
[boot] ready
`,"/etc/hostname":`buildroot
`,"/etc/os-release":`NAME=Buildroot
VERSION=2020.02
ID=buildroot
`,"/proc/cpuinfo":`processor	: 0
vendor_id	: GenuineIntel
model name	: Pentium III (Katmai)
`,"/proc/meminfo":`MemTotal:          42536 kB
MemFree:           34032 kB
`,"/bin/busybox":"","/usr/bin/links":"","/usr/bin/joe":""},W=`PID   USER     COMMAND
    1 root     init
    2 root     [kthreadd]
   24 root     -/bin/sh
   38 root     sh -c while :; do sleep 3600; done FLAG{ps_sees_every_process}
   39 root     sleep 3600
   49 root     ps`,x={"uname -a":"Linux (none) 5.6.15 #16 Mon Jul 20 19:33:46 CDT 2020 i686 GNU/Linux","du -a /bin /sbin /usr /etc /var /root 2>/dev/null | sort -rn | head -n 10":`2608	/usr
1940	/usr/bin
1052	/root
1040	/root/tests
976	/usr/bin/links
780	/root/tests/test-i386
680	/bin
628	/bin/busybox
556	/usr/bin/joe
436	/usr/lib`,free:`              total        used        free      shared  buff/cache   available
Mem:          42536        3344       34028        5164        5164       32880
Swap:             0           0           0`,dmesg:"[    0.000000] Linux version 5.6.15 (simulated)"};async function M({onText:$}){return new k($)}class k{constructor(e){this.onText=e,this.line="",this.cwd="/root",this.t0=performance.now(),this.bootMs=0,this.files={...y},this.dirs=new Set(["/","/root","/root/tests","/home","/home/guest","/home/guest/notes","/home/guest/.config","/home/guest/.config/.dot","/var","/var/log","/etc","/proc","/bin","/usr","/usr/bin","/tmp"]),this.hist=[]}prompt(){return(this.cwd==="/root"?"~":this.cwd.split("/").pop()||"/")+"% "}send(e){for(const n of e.replace(/\x1b\[[0-9;]*[A-Za-z~]/g,""))if(n==="\r"){const i=this.exec(this.line);this.line="",this.onText(`\r
`+(i.out?i.out.replace(/\n/g,`\r
`)+`\r
`:"")+this.prompt())}else n===""?this.line&&(this.line=this.line.slice(0,-1),this.onText("\b \b")):n===""?(this.line="",this.onText(`^C\r
`+this.prompt())):n>=" "&&(this.line+=n,this.onText(n))}async run(e,{silent:n=!1,onStream:i=this.onText}={}){if(e===j)return{out:"",code:0};await new Promise(s=>setTimeout(s,120+Math.random()*180));const c=this.exec(e);return n||(c.out&&i(c.out.replace(/\n/g,`\r
`)+`\r
`),this.onText(this.prompt())),c}stats(){return{mips:0,uptime:(performance.now()-this.t0)/1e3,running:!0}}pause(){}resume(){}destroy(){}abs(e){if(!e||e==="~")return"/root";e.startsWith("~/")&&(e="/root/"+e.slice(2)),e.startsWith("/")||(e=this.cwd+"/"+e);const n=[];for(const i of e.split("/"))!i||i==="."||(i===".."?n.pop():n.push(i));return"/"+n.join("/")}exec(e){if(e=e.trim(),!e)return{out:"",code:0};if(this.hist.push(e),x[e]!==void 0)return{out:x[e],code:0};let n=[],i=0;for(const c of e.split(/\s*(?:;|&&)\s*/)){if(!c)continue;const s=this.pipeline(c);s.out&&n.push(s.out),i=s.code}return{out:n.join(`
`),code:i}}pipeline(e){const n=e.replace(/\s*2>\s*\/dev\/null/g,"").split(/\s*\|\s*/);let i=this.simple(n[0]);for(const c of n.slice(1))i=this.filter(c,i.out);return i}words(e){return(e.match(/'[^']*'|"[^"]*"|\S+/g)||[]).map(n=>n.replace(/^(['"])(.*)\1$/,"$2"))}simple(e){var m,g;let n=null;const i=e.match(/^(.*?)\s*(>>?)\s*(\S+)\s*$/);i&&/^(echo|printf)\b/.test(i[1])&&(e=i[1],n=[i[2],this.abs(i[3])]);const[c,...s]=this.words(e),l=t=>{if(n){const h=n[0]===">>"&&this.files[n[1]]||"";return this.files[n[1]]=h+t+(t.endsWith(`
`)?"":`
`),{out:"",code:0}}return{out:t,code:0}},p=t=>({out:t,code:1});switch(c){case"echo":return l(s.filter(t=>t!=="-n").join(" "));case"printf":return l((s[0]||"").replace(/\\n/g,`
`).replace(/\n$/,""));case"pwd":return l(this.cwd);case"whoami":return l("root");case"cd":{const t=this.abs(s[0]);return this.dirs.has(t)?(this.cwd=t,l("")):p(`sh: cd: can't cd to ${s[0]}: No such file or directory`)}case"mkdir":for(const t of s.filter(h=>!h.startsWith("-"))){let h="";for(const u of this.abs(t).split("/").filter(Boolean))h+="/"+u,this.dirs.add(h)}return l("");case"rm":{const t=s.filter(o=>o.startsWith("-")).join(""),h=/[rR]/.test(t),u=t.includes("f"),f=[];for(const o of s.filter(d=>!d.startsWith("-"))){let d=[this.abs(o)];if(o.includes("*")){const r=o.lastIndexOf("/"),a=this.abs(r>=0?o.slice(0,r)||"/":"."),w=new RegExp("^"+o.slice(r+1).replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*")+"$");d=this.children(a).filter(b=>w.test(b)&&!b.startsWith(".")).map(b=>(a==="/"?"":a)+"/"+b),d.length||(d=[this.abs(o)])}for(const r of d){if(this.files[r]!==void 0){delete this.files[r];continue}if(!this.dirs.has(r)){u||f.push(`rm: can't remove '${o}': No such file or directory`);continue}if(!h){f.push(`rm: '${o}' is a directory`);continue}if(r==="/"){f.push("rm: it is dangerous to operate recursively on '/'");continue}for(const a of Object.keys(this.files))a.startsWith(r+"/")&&delete this.files[a];for(const a of[...this.dirs])(a===r||a.startsWith(r+"/"))&&this.dirs.delete(a);(this.cwd===r||this.cwd.startsWith(r+"/"))&&(this.cwd="/")}}return f.length?p(f.join(`
`)):l("")}case"touch":for(const t of s)(m=this.files)[g=this.abs(t)]??(m[g]="");return l("");case"cat":{const t=[];for(const h of s){const u=this.abs(h);if(this.files[u]===void 0)return p(`cat: can't open '${h}': No such file or directory`);t.push(this.files[u].replace(/\n$/,""))}return l(t.join(`
`))}case"ls":{const t=s.some(o=>/^-\w*l/.test(o)),h=s.some(o=>/^-\w*a/.test(o)),u=this.abs(s.find(o=>!o.startsWith("-"))||".");if(this.files[u]!==void 0)return l(u);if(!this.dirs.has(u))return p(`ls: ${u}: No such file or directory`);const f=this.children(u).filter(o=>h||!o.startsWith("."));return l(t?["total 4",...f.map(o=>{const d=this.dirs.has(u.replace(/\/$/,"")+"/"+o),r=this.files[(u==="/"?"":u)+"/"+o]||"";return`${d?"drwxr-xr-x":"-rw-r--r--"}    2 root     root     ${String(d?80:r.length).padStart(10)} Oct 20 17:33 ${o}`})].join(`
`):f.join("  "))}case"find":{const t=s.filter((r,a)=>!r.startsWith("-")&&!["-name","-type"].includes(s[a-1])).map(r=>this.abs(r)),h=s.indexOf("-name"),u=h>=0?s[h+1]:"*",f=new RegExp("^"+u.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".")+"$"),o=s.includes("f"),d=[...Object.keys(this.files),...o?[]:this.dirs];return l(d.filter(r=>t.some(a=>r.startsWith(a==="/"?"/":a+"/"))&&f.test(r.split("/").pop())).sort().join(`
`))}case"grep":{const t=s.filter(r=>r.startsWith("-")).join(""),[h,...u]=s.filter(r=>!r.startsWith("-")),f=new RegExp(h,t.includes("i")?"i":""),o=u.flatMap(r=>{const a=this.abs(r);return this.files[a]!==void 0?[a]:Object.keys(this.files).filter(w=>w.startsWith(a+"/"))}),d=o.flatMap(r=>this.files[r].split(`
`).filter(a=>a&&f.test(a)).map(a=>(o.length>1||t.includes("r")?r+":":"")+a));return d.length?l(d.join(`
`)):{out:"",code:1}}case"sed":{const t=(s.find(f=>f.startsWith("s/"))||"").match(/^s\/(.*?)\/(.*?)\/p?$/),h=this.files[this.abs(s[s.length-1])]||"";if(!t)return p("sed: unsupported in the simulation");const u=new RegExp(t[1]);return l(h.split(`
`).filter(f=>u.test(f)).map(f=>f.replace(u,t[2])).join(`
`))}case"ps":return l(W);case"uname":return l(s.length?x["uname -a"]:"Linux");case"head":case"tail":{const t=this.files[this.abs(s[s.length-1])];return t===void 0?p(`${c}: can't open`):this.filter(e.replace(/\s\S+$/,""),t)}case"history":return l(this.hist.map((t,h)=>`${String(h+1).padStart(4)} ${t}`).join(`
`));case"clear":return{out:"\x1B[H\x1B[J",code:0};case"help":return l("simulation: ls cd pwd cat echo printf mkdir rm touch find grep sed ps uname head tail history clear");case"free":case"dmesg":return l(x[c]);default:return{out:`sh: ${c}: not available in this simulation`,code:127}}}children(e){const n=e==="/"?"/":e+"/",i=new Set;for(const c of[...Object.keys(this.files),...this.dirs])c.startsWith(n)&&c!==e&&i.add(c.slice(n.length).split("/")[0]);return[...i].filter(Boolean).sort()}filter(e,n){const[i,...c]=this.words(e),s=n.split(`
`),l=()=>{const p=c.indexOf("-n");return p>=0?+c[p+1]:10};if(i==="grep"){const p=c.includes("-v"),m=c.filter(t=>!t.startsWith("-")).pop()||"",g=new RegExp(m,c.includes("-i")?"i":"");return{out:s.filter(t=>g.test(t)!==p).join(`
`),code:0}}if(i==="head")return{out:s.slice(0,l()).join(`
`),code:0};if(i==="tail")return{out:s.slice(-l()).join(`
`),code:0};if(i==="wc")return{out:String(s.filter(Boolean).length),code:0};if(i==="sort")return{out:s.sort().join(`
`),code:0};if(i==="base64"&&c.includes("-d"))try{return{out:atob(n.trim()),code:0}}catch{return{out:"base64: invalid input",code:1}}return{out:`sh: ${i}: not available in this simulation`,code:127}}}export{M as bootSim};
