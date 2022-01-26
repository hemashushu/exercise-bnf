# Output

## Generating the parser

```bash
$ npm exec syntax-cli -- \
  --mode LALR1 \
  --grammar "09-class.bnf" \
  --output generated/parser.js
```

## Parsing the program source file

```bash
$ ./ast.js ../09-class.xuan
```
