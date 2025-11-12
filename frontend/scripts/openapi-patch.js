import fs from "fs";
import path from "path";

const root = path.resolve("src/api/generated");

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    const replacements = {
        "from '../core/request'": "from '../../request.custom'",
        "from '../core/OpenAPI'": "from '../../OpenAPI.custom'",
        "from './OpenAPI'": "from '../../OpenAPI.custom'",
        "from './core/OpenAPI'": "from '../OpenAPI.custom'",
    };

    for (const [from, to] of Object.entries(replacements)) {
        content = content.replaceAll(from, to);
    }

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
console.log("Все импорты request и OpenAPI заменены на request.custom и OpenAPI.custom");
