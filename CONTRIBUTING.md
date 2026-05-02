# Guía de Contribución

¡Gracias por tu interés en contribuir a LegalTech UY!

## Código de Conducta

Somos una comunidad inclusiva. Al participar, aceptás mantener un ambiente respetuoso y profesional.

## Formas de Contribuir

1. **Reportar bugs** - Abrí un issue con el template de bug
2. **Sugerir features** - Abrí un issue con el template de feature
3. **Mejorar documentación** - Make pull requests a la docs
4. **Contribuir código** - Seguilo guía abajo
5. **Comunidad** - Ayudá a otros en issues y discusiones

## Desarrollo Local

```bash
# Fork y clone
git clone https://github.com/TU_USUARIO/legaltech-uy.git
cd legaltech-uy

# Agregar upstream
git remote add upstream https://github.com/legaltech-uy/legaltech-uy.git

# Crear rama para tu feature
git checkout -b feat/tu-feature

# Desarrollo...
npm run dev

# Make commits con Conventional Commits
git commit -m "feat: add buscar juridico"

# Push y PR
git push origin feat/tu-feature
```

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[alcance]: <descripción>

 tipos: feat, fix, docs, style, refactor, test, chore
 alcance (opcional): search, chat, auth, api
```

Ejemplos:
- `feat(search): add filtro por tipo de norma`
- `fix(chat): corregir respuesta de plazos`
- `docs: actualizar README`

## Pull Requests

1. Fork el repositorio
2. Creá una rama (`feature/cosa` o `fix/cosa`)
3. Hacé los cambios + tests
4. Actualizá documentation si es necesario
5. Abrí PR con descripción clara

### Checklist del PR

- [ ] Tests incluidos/pasados
- [ ] Documentación actualizada
- [ ] Sin warnings de lint
- [ ] Descripción clara del cambio

## Estándares de Código

- TypeScript strict
- ESLint + Prettier configurados
- Nombres descriptivos en español/inglés técnico
- Componentes funcionales de React
- Server Components donde no se necesita interactivity

## Preguntas?

- GitHub Discussions
- Issues con标签 "question"