const {getDB,saveDB}=require("../database/database");
const cart=require("./cartService");

function create(userId){
  const items=cart.list(userId);
  if(!items.length)throw new Error("CART_EMPTY");

  const db=getDB();
  let total=0;

  for(const x of items)total+=x.total;

  db.run(`
    INSERT INTO orders(user_id,total,status,payment_status)
    VALUES(?,?, 'pending','unpaid')
  `,[userId,total]);

  const id=Number(db.exec("SELECT last_insert_rowid()")[0].values[0][0]);

  for(const x of items){
    db.run(`
      INSERT INTO order_items
      (order_id,product_id,title,unit_price,quantity,total)
      VALUES(?,?,?,?,?,?)
    `,[id,x.productId,x.title,x.price,x.quantity,x.total]);
  }

  cart.clear(userId);
  saveDB();

  return get(id,userId);
}

function get(id,userId){
  const db=getDB();

  const o=db.exec(`
    SELECT id,user_id,total,status,payment_status,created_at,updated_at
    FROM orders WHERE id=? AND user_id=?
  `,[id,userId]);

  if(!o.length||!o[0].values.length)return null;

  const x=o[0].values[0];

  const r=db.exec(`
    SELECT product_id,title,unit_price,quantity,total
    FROM order_items WHERE order_id=?
  `,[id]);

  return {
    id:x[0],userId:x[1],total:Number(x[2]),status:x[3],
    paymentStatus:x[4],createdAt:x[5],updatedAt:x[6],
    items:r.length?r[0].values.map(v=>({
      productId:v[0],title:v[1],unitPrice:Number(v[2]),
      quantity:Number(v[3]),total:Number(v[4])
    })): []
  };
}

function list(userId){
  const db=getDB();
  const r=db.exec(`
    SELECT id,total,status,payment_status,created_at
    FROM orders WHERE user_id=?
    ORDER BY id DESC
  `,[userId]);

  if(!r.length)return [];
  return r[0].values.map(x=>({
    id:x[0],total:Number(x[1]),status:x[2],
    paymentStatus:x[3],createdAt:x[4]
  }));
}

module.exports={create,get,list};
