This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3200](http://localhost:3200) with your browser to see the result.


## Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention. Please use the following format for commit messages:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- **feat**: A new feature for the user.
- **fix**: A bug fix.
- **docs**: Documentation changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
- **refactor**: Code changes that neither fix a bug nor add a feature.
- **perf**: Code changes that improve performance.
- **test**: Adding or correcting tests.
- **chore**: Maintenance tasks or changes that don’t modify src or test files.


## Branch Naming Convention

Follow these conventions for branch names:

```
feature/: For developing new features.
hotfix/: To fix critical bugs in production.
```

#### Suffix with Task Number

Branch names should include a suffix with the task number

```
feature/login-auth-0001
hotfix/crash-on-login-001
```

For more information, refer to the [Naming Conventions for Git Branches: A Cheatsheet](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534).

### Folder Structure

Use kebab case for folder names 

### Global Constants and EnumsThis is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3200](http://localhost:3200) with your browser to see the result.


## Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention. Please use the following format for commit messages:

```
<type>(<scope>): <subject>-<task-number>

[optional body]

[optional footer]
```

### Types

- **feat**: A new feature for the user.
- **fix**: A bug fix.
- **docs**: Documentation changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
- **refactor**: Code changes that neither fix a bug nor add a feature.
- **perf**: Code changes that improve performance.
- **test**: Adding or correcting tests.
- **chore**: Maintenance tasks or changes that don’t modify src or test files.

### Suffix with Task Number

Branch names should include a suffix with the task number

```
feature/login-auth-tax-101
hotfix/crash-on-login-tax-102
```

## Branch Naming Convention

Follow these conventions for branch names:

```
feature/: For developing new features.
hotfix/: To fix critical bugs in production.
```


For more information, refer to the [Naming Conventions for Git Branches: A Cheatsheet](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534).

## Folder Structure

Use kebab case for folder names 

## For global constants and enums, follow SCREAMING_SNAKE_CASE:

- **Constants**:

Example:
```javascript
export const QUERY_DEFAULT = ...;
```

- **Enums**: Use enum for defining enumerated types and include the _ENUM suffix.

Example:
```javascript
export enum USER_QUERY_KEY_ENUM {
  ...
}
```


## Suggested VSCode Plugins

- **[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)**: Helps with spelling errors in your code.
- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**: Integrates ESLint into VSCode to find and fix problems in your JavaScript code.
- **[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**: An opinionated code formatter to ensure consistent style.
