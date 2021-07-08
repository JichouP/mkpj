npx husky install
npx husky add .husky/pre-commit "npx --no-install lint-staged"
npx husky add .husky/pre-commit "npm test"