function pagination(query){
  let page=Number(query.page)||1;
  let limit=Number(query.limit)||20;

  page=Math.max(1,Math.min(page,10000));
  limit=Math.max(1,Math.min(limit,100));

  return {
    page,
    limit,
    offset:(page-1)*limit
  };
}

module.exports={pagination};
