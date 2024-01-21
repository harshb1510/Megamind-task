import { connect } from "../../../db/db";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password,phone } = reqBody;
    
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    try {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone
      });
      const savedUser = await newUser.save();
      // Additional logic for success if needed
    } catch (error) {
      console.error(error);
      // Handle the error here, for example, send an error response to the client
    }
    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export default { POST };
