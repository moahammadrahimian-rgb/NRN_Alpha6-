const {getDB,saveDB}=require("../database/database");

function add(userId,productId,quantity=1){
  quantity=Number(quantity);
  if(!Number.isInteger(quantity)||quantity<1)throw new Error("INVALID_QUANTITY");

  const db=getDB();
  const p=db.exec("SELECT id,stock,status FROM products WHERE id=?",[productId]);

  if(!p.length||!p[0].values.length)throw new Error("PRODUCT_NOT_FOUND");
  if(p[0].values[0][2]!=="active")throw new Error("PRODUCT_INACTIVE");
  if(Number(p[0].values[0][1])<quantity)throw new Error("INSUFFICIENT_STOCK");

  db.run(`
    INSERT INTO carts(user_id,product_id,quantity)
    VALUES(?,?,?)
    ON CONFLICT(user_id,product_id)
    DO UPDATE SET quantity=quantity+excluded.quantity
  `,[userId,productId,quantity]);

  saveDB();
}

function list(userId){
  const db=getDB();
  const r=db.exec(`
    SELECT c.product_id,p.title,p.price,c.quantity,
           p.price*c.quantity AS total
    FROM carts c JOIN products p ON p.id=c.product_id
    WHERE c.user_id=?
  `,[userId]);

  if(!r.length)return [];
  return r[0].values.map(x=>({
    productId:x[0],title:x[1],price:Number(x[2]),
    quantity:Number(x[3]),total:Number(x[4])
  }));
}

function clear(userId){
  const db=getDB();
  db.run("DELETE FROM carts WHERE user_id=?",[userId]);
  saveDB();
}

module.exports={add,list,clear};
