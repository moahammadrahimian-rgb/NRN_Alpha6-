async function api(url,options={}){
  const token=localStorage.getItem("alpha6_token");
  options.headers={
    "Content-Type":"application/json",
    ...(options.headers||{})
  };
  if(token) options.headers.Authorization="Bearer "+token;

  const r=await fetch(url,options);
  const text=await r.text();

  try{
    return {status:r.status,data:JSON.parse(text)};
  }catch{
    return {status:r.status,data:text};
  }
}

async function health(){
  const x=await api("/api/health");
  const el=document.getElementById("output");
  if(el) el.textContent=JSON.stringify(x,null,2);
}
