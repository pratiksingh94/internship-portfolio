
#  Internship Portfolio

  
  


###  prerequisites
- Node.js

- npm/yarn/pnpm

### Installation

Clone the repository

```bash
git  clone  https://github.com/pratiksingh94/internship-portfolio.git
cd  internship-portfolio
```

  
##  Backend
  
### dependencies

```bash
cd  backend

npm  install
# or
yarn  install
# or
pnpm  install
```


### pre-run
1. make a `.env`
2. insert your mongodb URI and port (optional) in thier respective variables
```env
MONGODB_URI=<insert mongodb uri here>
PORT=5000
```


###  Development

  

Run the development server:

```bash
npm  run  dev
# or
yarn  dev
# or
pnpm  dev
```  

The api will be available at `http://localhost:5000`

### post-run
**after** starting the development server, run this command this terminal which populates the database with some members
```bash
curl -X POST localhost:5000/api/init-data
```

---


##  Frontend
  
1. Install dependencies

```bash
cd  frontend

npm  install
# or
yarn  install
# or
pnpm  install
```

  

###  Development

  

Run the development server:

```bash
npm  run  dev
# or
yarn  dev
# or
pnpm  dev
```

  

The site will be available at `http://localhost:5173`
