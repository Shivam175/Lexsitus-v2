---
to: src/Stores/index.ts
inject: true
skip_if: "import <%= name %> from './<%= name %>'"
after: import
---
import <%= Name %>Store from './<%= Name %>';