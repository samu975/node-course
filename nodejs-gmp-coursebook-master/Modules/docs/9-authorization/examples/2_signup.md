---
sidebar_position: 1
---

# Signup
To implement registration flow we need to define user model first. Let's update our `model/user.ts` file:

```typescript
import { Schema, model } from "mongoose";

interface IUser {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
}

export const UserSchema = new Schema<IUser>({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: {type: String}
});

const User = model("user", UserSchema);
export default User;
```

Now we add route for our registration flow in `server.ts`:
```typescript
import express, { Express, Request, Response } from "express";

import User from "./model/user";
import bcrypt from "bcryptjs";

export async function bootstrap(): Promise<Express> {
    ...
    app.post("/register", async (req: Request, res: Response) => {
        try {
            // Get user input
            const { first_name, last_name, isAuthor, email, password } = req.body;

            // Validate user input
            if (!(email && password && first_name && last_name)) {
                res.status(400).send("All input is required");
            }

            // Validate if user already exist in our database
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                role: isAuthor === "true" ? "author" : "reader"
            });

            res.status(201).send("User successfully registered");
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
    ...
}
```

Now let's discuss our code snippet. In code above we validate user input first. After that we encrypt user password to make it secure from hackers:

```typescript
const encryptedPassword = await bcrypt.hash(password, 10);
```

In this example we've use encryption method also known as one-way encryption. With this type of encryption, there is no known way to decrypt an encrypted string. This approach is extremely secure, as it is almost impossible to determine the hash value unless the hacker knows which hash algorithm was used.

Then we create new user with role based on user input and return result.
