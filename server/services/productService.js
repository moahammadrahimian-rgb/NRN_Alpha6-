const {getDB,saveDB}=require("../database/database");

function create(userId,data){
  const title=String(data.title||"").trim();
  const description=String(data.description||"");
  const price=Number(data.price);
  const stock=Number(data.stock||0);

  if(!title) throw new Error("PRODUCT_TITLE_REQUIRED");
  if(!Number.isInteger(price)||price<0) throw new Error("INVALID_PRODUCT_PRICE");
  if(!Number.isInteger(stock)||stock<0) throw new Error("INVALID_PRODUCT_STOCK");

  const db=getDB();

  db.run(`
    INSERT INTO products
    (owner_user_id,title,description,price,stock)
    VALUES(?,?,?,?,?)
  `,[userId,title,description,price,stock]);

  saveDB();

  const r=db.exec("SELECT last_insert_rowid()");
  return get(Number(r[0].values[0][0]));
}

function get(id){
  const db=getDB();
  const r=db.exec(`
    SELECT id,owner_user_id,title,description,price,stock,status,created_at,updated_at
    FROM products WHERE id=? LIMIT 1
  `,[id]);

  if(!r.length||!r[0].values.length) return null;
  const x=r[0].values[0];

  return {
    id:x[0],ownerUserId:x[1],title:x[2],description:x[3],
    price:Number(x[4]),stock:Number(x[5]),status:x[6],
    createdAt:x[7],updatedAt:x[8]
  };
}

function list(){
  const db=getDB();
  const r=db.exec(`
    SELECT id,owner_user_id,title,description,price,stock,status,created_at
    FROM products
    WHERE status='active'
    ORDER BY id DESC
    LIMIT 200
  `);

  if(!r.length)return [];
  return r[0].values.map(x=>({
    id:x[0],ownerUserId:x[1],title:x[2],description:x[3],
    price:Number(x[4]),stock:Number(x[5]),status:x[6],createdAt:x[7]
  }));
}

module.exports={create,get,list};
