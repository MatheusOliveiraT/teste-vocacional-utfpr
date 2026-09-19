---
name: UTFPR Clean Dark
colors:
  primary: "#FFC709"        # Amarelo UTFPR (Botões de destaque, progresso, estados ativos)
  on-primary: "#0D1117"     # Texto escuro para contraste sobre o amarelo
  secondary: "#30363D"      # Elementos secundários, bordas ativas e cards
  surface: "#0D1117"        # Fundo principal da página (Dark elegante estilo GitHub/VSCode)
  surface-card: "#161B22"   # Fundo de cards, caixas e modais
  on-surface: "#F0F6FC"     # Texto principal de alta legibilidade
  on-surface-subtle: "#8B949E" # Texto secundário, rótulos e descrições pequenas
  error: "#F85149"          # Alertas, validações e erros
typography:
  fontFamily: Inter, -apple-system, BlinkMacSystemFont, sans-serif
  headline-lg:
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
  headline-md:
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  label-sm:
    fontSize: 12px
    fontWeight: 600
    textTransform: uppercase
    letterSpacing: 0.05em
rounded:
  sm: 6px
  md: 10px
  lg: 16px
---

# UTFPR Teste Vocacional — Design System

## Overview
Interface moderna e minimalista para o Teste Vocacional da UTFPR Câmpus Campo Mourão.
Foco em excelente experiência de uso em dispositivos móveis e desktop, com baixo ruído visual, tipografia nítida e uso estratégico das cores institucionais da universidade.

## Palette
- **Primary / Brand Yellow** (`#FFC709`): CTAs principais, progresso ativo, destaques de compatibilidade de cursos.
- **Surface Dark** (`#0D1117`): Fundo principal escuro com alto conforto visual para leitura.
- **Surface Card** (`#161B22`): Fundo elevado com bordas sutis (`#30363D`) para contêineres de duelos e formulários.
- **On-Surface High Contrast** (`#F0F6FC`): Textos principais e títulos.
- **On-Surface Muted** (`#8B949E`): Rótulos secundários, contador de perguntas e descrições.

## Typography
- **Headlines**: Inter, bold/semi-bold (20px a 28px).
- **Body**: Inter, regular (15px a 16px).
- **Labels / Badges**: Inter, semi-bold (12px), caixa alta para marcas de apoio e etapas.

## Component Specifications
- **Buttons**:
  - *Primary*: Fundo `#FFC709`, texto `#0D1117` em negrito, cantos arredondados (10px). Transição suave no hover.
  - *Duelo / Card Selection*: Fundo `#161B22`, borda 1.5px `#30363D`, hover com iluminação sutil amarela e cursor pointer.
- **Inputs & Selects**:
  - Borda de 1px em `#30363D`, fundo `#161B22`, texto `#F0F6FC`. Estado de foco em `#FFC709`.
- **Progress Bar**:
  - Trilha em `#21262D`, preenchimento ativo animado em `#FFC709`.
- **Course Compatibility Bars**:
  - Barra de percentual com gradiente suave entre `#FFC709` e `#E0A800`.

## Do's and Don'ts
- **DO**: Use o Amarelo UTFPR (`#FFC709`) prioritariamente para ações ativas, botões finais e o curso vencedor.
- **DO**: Mantenha o contraste de no mínimo 4.5:1 para leitura de textos em telas escuras.
- **DON'T**: Não utilize cantos totalmente retos (0px) misturados com arredondados. Mantenha o raio constante de 10px (`rounded-md`).
- **DON'T**: Não polua a tela de duelos com elementos visuais desnecessários além das duas opções e do contador de progresso.