const fs=require("fs");
const path=require("path");

function backup(source,target){
  if(!fs.existsSync(source)){
    throw new Error("DATABASE_FILE_NOT_FOUND");
  }

  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.copyFileSync(source,target);

  return target;
}

module.exports={backup};
