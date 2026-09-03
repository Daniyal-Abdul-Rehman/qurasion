# Documentation

This directory contains comprehensive documentation for the Real Estate Intelligence and Investor Marketplace Platform.

## Structure

```
docs/
├── architecture/     # Architecture documentation
│   ├── overview.md   # System architecture overview
│   └── data-model.md # Database schema and relationships
├── runbooks/         # Operational runbooks
│   └── getting-started.md # Development setup guide
└── decisions/        # Architectural decision records (ADR)
```

## Architecture Documentation

### Overview
The [architecture overview](architecture/overview.md) provides a comprehensive view of:
- System architecture and technology layers
- Domain modules and their responsibilities
- Data flow patterns
- Architectural principles
- Scalability considerations
- Security architecture
- Monitoring and observability

### Data Model
The [data model documentation](architecture/data-model.md) details:
- Core entities and their fields
- Entity relationships
- Data integrity constraints
- Data lifecycle management
- Indexing strategies

## Runbooks

### Getting Started
The [getting started guide](runbooks/getting-started.md) covers:
- Prerequisites and setup
- Local development environment
- Docker development
- Testing procedures
- Code quality tools
- Database operations
- Troubleshooting common issues
- Production deployment

## Decision Records

Architectural Decision Records (ADRs) will be added to the `decisions/` directory to document significant architectural decisions. Each ADR should follow the format:

- **Title**: Decision title
- **Status**: Proposed, Accepted, Rejected, Superseded
- **Context**: Background and problem statement
- **Decision**: Description of the decision
- **Consequences**: Positive and negative consequences

## Contributing to Documentation

When adding new documentation:
1. Use clear, descriptive filenames
2. Follow existing formatting conventions
3. Include code examples where appropriate
4. Keep documentation up to date with code changes
5. Use markdown for all documentation files

## Documentation Standards

### Formatting
- Use Markdown (.md) files
- Follow standard markdown syntax
- Use code blocks for code examples
- Include proper heading hierarchy

### Content
- Be concise and clear
- Focus on user needs
- Provide examples where helpful
- Keep technical documentation accurate
- Update documentation when features change

### Review Process
- Technical documentation should be reviewed by senior engineers
- Runbooks should be tested by operations team
- Architecture docs should be reviewed by tech leads

## Related Resources

- [Main Repository README](../../README.md)
- [API Documentation](http://localhost:3001/api/docs)
- [Package Documentation](../../packages/)
