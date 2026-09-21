const {getDB,saveDB}=require("../database/database");

function methods(){
  const db=getDB();
  const r=db.exec(`
    SELECT id,name FROM shipping_methods WHERE active=1 ORDER BY id
  `);

  if(!r.length)return [];
  return r[0].values.map(x=>({id:x[0],name:x[1]}));
}

function create(userId,data){
  const db=getDB();

  const orderId=Number(data.orderId);
  const methodId=Number(data.methodId);
  const name=String(data.recipientName||"").trim();
  const phone=String(data.phone||"").trim();
  const address=String(data.address||"").trim();

  if(!orderId||!methodId||!name||!phone||!address){
    throw new Error("SHIPPING_FIELDS_REQUIRED");
  }

  const owner=db.exec(`
    SELECT id FROM orders WHERE id=? AND user_id=?
  `,[orderId,userId]);

  if(!owner.length||!owner[0].values.length){
    throw new Error("ORDER_NOT_FOUND");
  }

  db.run(`
    INSERT INTO shipping_orders
    (order_id,user_id,method_id,recipient_name,phone,
     province,city,address,postal_code)
    VALUES(?,?,?,?,?,?,?,?,?)
  `,[
    orderId,userId,methodId,name,phone,
    String(data.province||""),
    String(data.city||""),
    address,
    String(data.postalCode||"")
  ]);

  saveDB();

  return {
    ok:true,
    message:"SHIPPING_REGISTERED"
  };
}

function list(userId){
  const db=getDB();

  const r=db.exec(`
    SELECT s.id,s.order_id,m.name,s.recipient_name,s.phone,
           s.province,s.city,s.address,s.postal_code,
           s.tracking_code,s.status,s.created_at
    FROM shipping_orders s
    JOIN shipping_methods m ON m.id=s.method_id
    WHERE s.user_id=?
    ORDER BY s.id DESC
  `,[userId]);

  if(!r.length)return [];

  return r[0].values.map(x=>({
    id:x[0],orderId:x[1],method:x[2],recipientName:x[3],
    phone:x[4],province:x[5],city:x[6],address:x[7],
    postalCode:x[8],trackingCode:x[9],status:x[10],createdAt:x[11]
  }));
}

module.exports={methods,create,list};
