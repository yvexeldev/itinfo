const bcrypt = require("bcryptjs");

console.log(
    bcrypt.compareSync(
        "xUDehxQO",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjBiNTFlYjhkMzVhZGZhO…"
    )
);