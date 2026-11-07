# Trechos de configuração para economizar tokens

Confirme os nomes das chaves na documentação da sua versão do Claude Code antes de aplicar. Peça autorização ao usuário antes de editar arquivos de configuração.

## 1) Bloquear leitura de pastas/arquivos pesados (`.claude/settings.json`)
```json
{
  "permissions": {
    "deny": [
      "Read(./node_modules/**)",
      "Read(./dist/**)",
      "Read(./build/**)",
      "Read(./.next/**)",
      "Read(./coverage/**)",
      "Read(./**/*.min.js)",
      "Read(./**/*.map)",
      "Read(./package-lock.json)",
      "Read(./pnpm-lock.yaml)",
      "Read(./yarn.lock)"
    ]
  }
}
```
Atenção: se bloquear um lockfile e precisar dele depois, a leitura será negada; ajuste a regra.

## 2) Menos raciocínio quando a tarefa é simples
Variáveis de ambiente e comandos de esforço mudam entre versões. Use `/model` e `/help` para ver o que a sua versão oferece. Regra prática: esforço baixo em tarefas mecânicas, alto só no difícil.

## 3) CLAUDE.md enxuto (modelo)
```md
# Projeto
- Stack: <uma linha>
- Comandos: build `...` | test `...` | lint `...`
- Regras que não podem ser quebradas: <3 a 7 linhas>
- Onde ficam as coisas: <5 linhas>
```
Tudo que for explicação longa vira arquivo em `docs/` lido sob demanda.
