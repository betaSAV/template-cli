---
to: <%= cwd %>/<%=project%>/src/persistence/enum/sort-direction.enum.ts
unless_exists: true
---
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
