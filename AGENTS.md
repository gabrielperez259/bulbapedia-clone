# AGENTS.md

## Project Overview

This is an Angular application built with Angular 22.

The project is a Bulbapedia-style application that consumes data from the PokeAPI.

Before making changes, inspect the existing code and follow established project patterns instead of introducing new patterns unnecessarily.

## Technology

- Angular 22
- TypeScript
- Angular Signals
- PokeAPI
- Follow the testing framework and tooling already configured in `package.json`.

## General Development Principles

- Prefer simple, maintainable solutions over unnecessary abstractions.
- Reuse existing components, services, pipes, directives, and utilities when appropriate.
- Keep changes focused on the requested task.
- Do not rewrite working code without a clear reason.
- Do not introduce new dependencies unless they are necessary.
- Preserve existing behavior unless the task explicitly requires changing it.
- Prefer Angular and TypeScript built-in functionality over custom implementations when appropriate.

## Angular

- Use modern Angular APIs compatible with Angular 22.
- Use standalone components.
- Do NOT explicitly add `standalone: true` to Angular decorators.
- Prefer signals for local reactive state.
- Use `computed()` for derived state.
- Use `input()` and `output()` instead of the decorator-based APIs.
- Use `inject()` instead of constructor injection.
- Use native control flow such as `@if`, `@for`, and `@switch`.
- Do NOT use `*ngIf`, `*ngFor`, or `*ngSwitch`.
- Do NOT use `ngClass`; use `class` bindings.
- Do NOT use `ngStyle`; use `style` bindings.
- Do NOT use `@HostBinding` or `@HostListener`; use the `host` property of Angular decorators.
- Prefer lazy loading for feature routes.
- Follow the existing project architecture before creating new abstractions.

## TypeScript

- Use strict typing.
- Prefer type inference when the type is obvious.
- Avoid `any`.
- Use `unknown` when the type is genuinely unknown.
- Prefer precise types and existing project types over duplicated type definitions.

## State Management

- Use signals for local component state.
- Use `computed()` for derived state.
- Keep state transformations pure and predictable.
- Do NOT use `mutate()` on signals.
- Use `set()` or `update()` instead.
- Avoid duplicating the same state in multiple places.

## Components

- Keep components small and focused on a single responsibility.
- Prefer components that are easy to test and reason about.
- Keep templates simple.
- Avoid putting complex business logic directly in templates.
- Prefer existing shared components before creating new ones.
- Follow the existing component organization and naming conventions.

## Services

- Keep services focused on a single responsibility.
- Use `providedIn: 'root'` for application-wide singleton services when appropriate.
- Use `inject()` for dependency injection.
- Keep API communication and data-access logic in appropriate services rather than components.

## Templates

- Keep templates simple and readable.
- Prefer Angular's native control-flow syntax.
- Use pipes for presentation/formatting logic where appropriate.
- Avoid complex expressions in templates.
- Preserve accessibility when introducing interactive elements.

## Accessibility

- All UI changes should follow WCAG AA requirements.
- Components should pass AXE accessibility checks.
- Interactive elements must be keyboard accessible.
- Use semantic HTML whenever possible.
- Provide appropriate accessible names for interactive controls.
- Use ARIA only when necessary and appropriate.
- Ensure sufficient color contrast.
- Consider focus management when implementing navigation, dialogs, menus, and other interactive UI.

## Images

- Use `NgOptimizedImage` for static images when applicable.
- Do not use `NgOptimizedImage` for inline base64 images.

## Routing

- Follow the existing routing architecture.
- Prefer lazy loading for feature areas.
- Use `RouterLink` for declarative navigation.
- Use programmatic navigation only when appropriate.
- Preserve existing route conventions and URL structure.

## HTTP and API

- Keep API communication outside components when possible.
- Follow the existing HTTP/data-access patterns in the project.
- Reuse existing models and types.
- Do not duplicate API models unnecessarily.
- When consuming PokeAPI data, account for optional fields and the actual API response shape.

## Testing

- Follow the testing patterns already established in the project.
- Tests must be compatible with Angular 22.
- Prefer testing observable behavior rather than implementation details.
- Keep tests focused on a single behavior.
- When modifying existing tests, preserve the established testing style.
- For routed components, use the project's established router testing approach.
- Avoid deprecated Angular testing APIs.
- Do not introduce testing patterns from older Angular versions when a modern Angular 22 approach exists.

## Validation

- After making changes, run the smallest relevant validation first.
- For application code, verify that the project builds successfully.
- For test changes, run the relevant tests.
- If validation fails, inspect the error and fix the underlying problem before considering the task complete.
- Do not claim that a change works without actually validating it when validation is available.

## Existing Project Patterns

Before introducing a new implementation:

1. Search the project for similar existing functionality.
2. Follow the existing implementation pattern when appropriate.
3. Reuse existing abstractions when they fit the problem.
4. Only introduce a new pattern when the existing architecture cannot reasonably support the requirement.

## Angular Documentation and Skills

The project contains the `angular-developer` skill under:

`.agents/skills/angular-developer/`

Use this skill for Angular-specific guidance.

The skill contains additional reference documentation under:

`.agents/skills/angular-developer/references/`

When a task involves a specific Angular feature, consult the relevant reference when appropriate.

The `AGENTS.md` contains project-specific rules and conventions. The Angular skill provides general Angular knowledge and guidance.

When the two overlap, prefer the project's established conventions unless they conflict with Angular's required behavior or the installed Angular version.

## Completion Criteria

Before considering a task complete:

- The requested functionality is implemented.
- Existing functionality has not been unnecessarily changed.
- TypeScript types are correct.
- Angular 22 APIs and project conventions are followed.
- Accessibility requirements are respected for UI changes.
- Relevant tests have been run or updated.
- Relevant build/validation checks have been performed.
- No unnecessary dependencies or abstractions were introduced.