const {getDB,saveDB}=require("../database/database");

function hasPermission(userId,permission){
  const db=getDB();
  const r=db.exec(`
    SELECT 1
    FROM user_roles ur
    JOIN role_permissions rp ON rp.role_id=ur.role_id
    JOIN permissions p ON p.id=rp.permission_id
    WHERE ur.user_id=? AND p.code=?
    LIMIT 1
  `,[userId,permission]);

  return !!(r.length && r[0].values.length);
}

function grantRole(userId,roleId){
  const db=getDB();
  db.run(
    "INSERT OR IGNORE INTO user_roles(user_id,role_id) VALUES(?,?)",
    [userId,roleId]
  );
  saveDB();
}

module.exports={hasPermission,grantRole};
