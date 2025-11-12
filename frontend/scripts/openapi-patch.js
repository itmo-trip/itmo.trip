import fs from "fs";
import path from "path";

const root = path.resolve("src/api/generated");

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    content = content.replace(
        "from '../core/request';",
        "from '../../request.custom';"
    );

    content = content.replace(
        "from '../core/OpenAPI';",
        "from '../../OpenAPI.custom';"
    );

    fs.writeFileSync(filePath, content);
    console.log("✅ Patched:", path.relative(process.cwd(), filePath));
}

function walk(dir) {
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith(".ts")) patchFile(full);
    }
}

walk(root);
console.log("Все импорты request → CustomRequest заменены");
