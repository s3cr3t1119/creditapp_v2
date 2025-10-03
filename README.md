# Credit Application v2

A modern, responsive credit application form built with Next.js, TypeScript, and modern web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Data Layer**: TanStack Query + TanStack Table (ready for implementation)

## ✨ Features

- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Form Validation**: Comprehensive validation with Zod schemas
- **Dynamic Sections**: Conditional form sections based on configuration
- **Smooth Animations**: Framer Motion for enhanced UX
- **Type Safety**: Full TypeScript support
- **Modern UI**: Beautiful components with shadcn/ui
- **State Management**: Centralized state with Zustand
- **Configurable**: URL-based configuration for customization

## 📋 Form Sections

1. **Vehicle Information**
   - Vehicle selection
   - Sales agent (configurable)
   - Down payment
   - Trade-in details

2. **Client Information**
   - Personal details
   - Contact information
   - Address information
   - Driver license (configurable)

3. **Residential Information**
   - Current residence
   - Previous residences (configurable)

4. **Employment Information**
   - Current employment
   - Previous employment
   - Employer address (configurable)

5. **Co-buyer Information**
   - Optional co-buyer section
   - Same sections as primary buyer

## 🎛️ Configuration

The application accepts various URL parameters for customization:

- `primaryColor`: Primary color for the theme
- `showAgents`: Show/hide sales agent selection
- `twoYearEmployment`: Require two years of employment history
- `employerAddress`: Show employer address fields
- `twoYearResidence`: Require two years of residence history
- `driverLicense`: Show driver license fields
- `previousResidency`: Show previous residence section
- `successPageEnabled`: Enable success page redirect

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Form section components
│   ├── CreditApplicationForm.tsx
│   ├── FormProvider.tsx
│   └── SuccessPage.tsx
└── lib/
    ├── store.ts           # Zustand store
    ├── schemas.ts         # Zod validation schemas
    └── utils.ts           # Utility functions
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom Tailwind configuration
- Update `src/app/globals.css` for global styles
- Use CSS variables for consistent theming

### Form Validation
- Edit `src/lib/schemas.ts` to modify validation rules
- Add new fields to the Zod schemas
- Update TypeScript interfaces accordingly

### State Management
- Modify `src/lib/store.ts` to add new state properties
- Add new actions for state updates
- Use the store in components with `useCreditAppStore()`

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Responsive form fields
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

1. Use shadcn/ui CLI to add new components:
   ```bash
   npx shadcn@latest add [component-name]
   ```

2. Create custom components in `src/components/`

### Form Integration

The form uses React Hook Form with Zod validation:

```typescript
const form = useForm<CreditApplication>({
  resolver: zodResolver(creditApplicationSchema),
  defaultValues: { /* ... */ }
})
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push

### Other Platforms

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `out` directory to your hosting platform

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please contact the development team.