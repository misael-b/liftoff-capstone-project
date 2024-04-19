"use server";

import { redirect } from 'next/navigation'
 
export async function navigate() {
  redirect("/create-post");
}

export async function homePage() {
  redirect("/login");
}

export async function userHomePage() {
  redirect("/profile");
}