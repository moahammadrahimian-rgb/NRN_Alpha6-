"use strict";

const jwt=require("jsonwebtoken");
const userService=require("./userService");
const {jwtSecret}=require("../config/env");

async function register(data){
  const name=String(data.username||data.name||"").trim();
  const password=String(data.password||"");
  const email=String(data.email||"").trim().toLowerCase();

  if(!name || !email || !password){
    throw new Error("نام کاربری، ایمیل و رمز عبور الزامی است");
  }

  if(password.length<8){
    throw new Error("رمز عبور باید حداقل ۸ کاراکتر باشد");
  }

  const existing=await userService.findByEmail(email);

  if(existing){
    throw new Error("ایمیل قبلاً ثبت شده است");
  }

  const user=await userService.createUser({
    name,
    email,
    password
  });

  return {
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
  };
}

async function login(data){
  const email=String(data.email||"").trim().toLowerCase();
  const password=String(data.password||"");

  if(!email || !password){
    throw new Error("ایمیل و رمز عبور الزامی است");
  }

  const user=await userService.findByEmail(email);

  if(!user){
    throw new Error("ایمیل یا رمز عبور اشتباه است");
  }

  const bcrypt=require("bcryptjs");
  const valid=await bcrypt.compare(password,user.password_hash);

  if(!valid){
    throw new Error("ایمیل یا رمز عبور اشتباه است");
  }

  const token=jwt.sign(
    {
      sub:user.id,
      role:user.role
    },
    jwtSecret,
    {
      expiresIn:"24h"
    }
  );

  return {
    token,
    user:{
      id:user.id,
      name:user.name,
      email:user.email,
      role:user.role
    }
  };
}

module.exports={
  register,
  login
};
