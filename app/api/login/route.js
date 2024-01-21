import { connect } from "../../../db/db";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

connect();

async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    console.log("user exists");

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);
    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
    console.log(token)
    console.log(token);
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

module.exports = { POST };
