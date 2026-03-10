// Internationalization (i18n) Module for Budget Buddy
// Supports: English (en), Hindi (hi), Spanish (es), French (fr)

const translations = {
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.calculators': 'Calculators',
        'nav.contact': 'Contact Us',
        'nav.login': 'Login',
        'nav.signup': 'Sign Up',
        'nav.hi': 'Hi',

        // Sidebar
        'sidebar.brand': 'Budget Buddy',
        'sidebar.dashboard': 'Dashboard',
        'sidebar.expenses': 'Expenses',
        'sidebar.budget': 'Budget',
        'sidebar.insights': 'Insights',
        'sidebar.profile': 'Profile',
        'sidebar.logout': 'Logout',

        // Hero Section
        'hero.slide1.title': 'Smart Budgeting 📝',
        'hero.slide1.subtitle': 'Plan your expenses and stick to your goals.',
        'hero.slide2.title': 'Save More 💰',
        'hero.slide2.subtitle': 'Every coin saved is a future dream earned.',
        'hero.slide3.title': 'Track Taxes & Bills 📄',
        'hero.slide3.subtitle': 'Never miss a deadline. Keep your records organized.',
        'hero.slide4.title': 'Mobile Access 📱',
        'hero.slide4.subtitle': 'Manage your budget anytime, anywhere.',
        'hero.btn.getstarted': 'Get Started',
        'hero.btn.startsaving': 'Start Saving',
        'hero.btn.tracknow': 'Track Now',
        'hero.btn.downloadapp': 'Download App',
        'hero.btn.smarttrack': 'Smart Track',

        // Features Dropdown
        'features.expensetracking': 'Expense Tracking',
        'features.categorization': 'Automatic Categorization',
        'features.budgetplanning': 'Monthly Budget Planning',
        'features.reports': 'Visual Reports & Analytics',
        'features.alerts': 'Alerts and Notifications',

        // Feature Sections
        'feature.food.label': 'Food & Dining',
        'feature.food.title': 'Deliciously on Budget.',
        'feature.food.description': 'Track every bite and crave responsibly. See exactly how much your foodie adventures are costing you without losing your appetite.',
        'feature.food.budgetused': 'Budget Used',
        'feature.food.spent': 'Spent',
        'feature.food.btn': 'View Food Details',

        'feature.travel.label': 'Travel & Commute',
        'feature.travel.title': 'Go Places, Save Money.',
        'feature.travel.description': 'From daily commutes to dream vacations. Keep your travel expenses on the radar and never get stranded without funds.',
        'feature.travel.btn': 'View Travel Details',

        'feature.subscriptions.label': 'Subscriptions',
        'feature.subscriptions.title': 'Manage Recurring Costs.',
        'feature.subscriptions.description': 'Netflix, Spotify, Gym? Don\'t let small recurring charges drain your account. Track and manage all your active subscriptions in one place.',
        'feature.subscriptions.btn': 'View Subscriptions',

        'feature.bills.label': 'Bills & Utilities',
        'feature.bills.title': 'Never Miss a Due Date.',
        'feature.bills.description': 'Stay on top of electricity, water, and internet bills. Get reminders and avoid those pesky late fees.',
        'feature.bills.btn': 'View Bills',

        // Analytics Section
        'analytics.monthlybudget': 'Monthly Budget',
        'analytics.used': 'used',
        'analytics.spent': 'Spent',
        'analytics.remaining': 'Remaining',
        'analytics.limit': 'Limit',
        'analytics.spendingcategories': 'Spending Categories',
        'analytics.heatmap': 'Daily Spending Heatmap',
        'analytics.lessspend': 'Less Spend',
        'analytics.morespend': 'More Spend 🔥',
        'analytics.topspending': 'Top 4 Spending Areas:',
        'analytics.alerts': 'Alerts & Insights',

        // Days of Week
        'day.sun': 'Sun',
        'day.mon': 'Mon',
        'day.tue': 'Tue',
        'day.wed': 'Wed',
        'day.thu': 'Thu',
        'day.fri': 'Fri',
        'day.sat': 'Sat',

        // Categories
        'category.food': 'Food',
        'category.travel': 'Travel',
        'category.bills': 'Bills',
        'category.subscriptions': 'Subscriptions',

        // Budget Status Messages
        'budget.exceeded': '🚨 Budget Exceeded! Limit your spending immediately.',
        'budget.critical': '⚠️ Almost there! Be careful with upcoming expenses.',
        'budget.halfway': '📊 Halfway through. Keep tracking!',
        'budget.great': '✅ You\'re doing great! Spending is under control.',

        // Notifications
        'notif.budgetexceeded': 'Budget Exceeded! Stop spending immediately or check your limit.',
        'notif.budgetcritical': 'Budget Critical! You have used over 85% of your limit.',
        'notif.highspend': 'High spend detected: ₹{amount} on {category}',
        'notif.daysleft': '{days} days left in month. \nSafe to spend: ₹{amount}/day',
        'notif.tip': 'Tip: {tip}',

        // Tips
        'tip.cook': 'Cook at home to save ~₹200/meal.',
        'tip.rule': 'Try the 50/30/20 rule for savings.',
        'tip.unsubscribe': 'Unsubscribe from unused apps today.',
        'tip.save': 'Save 10% of income before spending.',
        'tip.cash': 'Carry cash to limit overspending.',
        'tip.track': 'Track small expenses; they add up!',

        // Footer
        'footer.about': 'About',
        'footer.press': 'Press',
        'footer.blog': 'Blog',
        'footer.jobs': 'Jobs',
        'footer.calculators': 'Calculators',
        'footer.api': 'API',
        'footer.account': 'Account',
        'footer.login': 'Log in',
        'footer.signup': 'Sign up',
        'footer.resetpassword': 'Reset password',
        'footer.settings': 'Settings',
        'footer.pro': 'Budget Buddy Pro',
        'footer.pay': 'Budget Buddy Pay',
        'footer.card': 'Budget Buddy Card',
        'footer.more': 'More',
        'footer.contact': 'Contact us',
        'footer.faq': 'FAQ',
        'footer.status': 'Site status',
        'footer.terms': 'Terms of Service',
        'footer.privacy': 'Privacy Policy',
        'footer.copyright': '© 2023 Budget Buddy. All rights reserved.',

        // Modals - Login
        'modal.login.title': 'Welcome Back!',
        'modal.login.email': 'Email Address',
        'modal.login.password': 'Password',
        'modal.login.btn': 'Login',
        'modal.login.footer': 'Don\'t have an account?',
        'modal.login.signup': 'Sign Up',

        // Modals - Register
        'modal.register.title': 'Create Account',
        'modal.register.name': 'Full Name',
        'modal.register.email': 'Email Address',
        'modal.register.password': 'Password',
        'modal.register.btn': 'Sign Up',
        'modal.register.footer': 'Already have an account?',
        'modal.register.login': 'Login',

        // Modals - Budget
        'modal.budget.title': 'Set Monthly Budget',
        'modal.budget.amount': 'Budget Amount (₹)',
        'modal.budget.btn': 'Update Budget',

        // Modals - Profile
        'modal.profile.member': 'Member since',
        'modal.profile.monthlybudget': 'Monthly Budget',
        'modal.profile.totalspent': 'Total Spent',
        'modal.profile.editbtn': 'Edit Profile',
        'modal.profile.logoutbtn': 'Logout',

        // Modals - Category Analysis
        'modal.category.title': '📊 Analysis',
        'modal.category.alltime': 'All Time',
        'modal.category.thismonth': 'This Month',
        'modal.category.lastmonth': 'Last Month',
        'modal.category.last30days': 'Last 30 Days',
        'modal.category.addexpense': '+ Add Expense',
        'modal.category.close': 'Close',
        'modal.category.totalspent': 'Total Spent',
        'modal.category.dailyavg': 'Daily Average',

        // Day Details Modal
        'modal.day.title': 'Expenses on {date}',
        'modal.day.loading': 'Loading...',
        'modal.day.noexpenses': 'No expenses found for this day.',
        'modal.day.error': 'Error loading data',

        // Messages
        'msg.budgetupdated': 'Budget Updated Successfully!',
        'msg.loginsuccess': 'Login Successful!',
        'msg.registersuccess': 'Registration Successful!',
        'msg.logoutsuccess': 'Logged Out Successfully!',
        'msg.error': 'An error occurred. Please try again.',
    },

    hi: {
        // Navbar
        'nav.home': 'होम',
        'nav.features': 'विशेषताएं',
        'nav.calculators': 'कैलकुलेटर',
        'nav.contact': 'संपर्क करें',
        'nav.login': 'लॉगिन',
        'nav.signup': 'साइन अप',
        'nav.hi': 'नमस्ते',

        // Sidebar
        'sidebar.brand': 'बजट बडी',
        'sidebar.dashboard': 'डैशबोर्ड',
        'sidebar.expenses': 'खर्चे',
        'sidebar.budget': 'बजट',
        'sidebar.insights': 'जानकारी',
        'sidebar.profile': 'प्रोफाइल',
        'sidebar.logout': 'लॉगआउट',

        // Hero Section
        'hero.slide1.title': 'स्मार्ट बजटिंग 📝',
        'hero.slide1.subtitle': 'अपने खर्चों की योजना बनाएं और अपने लक्ष्यों पर टिके रहें।',
        'hero.slide2.title': 'अधिक बचत करें 💰',
        'hero.slide2.subtitle': 'हर बचाया गया सिक्का एक भविष्य का सपना है।',
        'hero.slide3.title': 'टैक्स और बिल ट्रैक करें 📄',
        'hero.slide3.subtitle': 'कभी भी डेडलाइन मिस न करें। अपने रिकॉर्ड व्यवस्थित रखें।',
        'hero.slide4.title': 'मोबाइल एक्सेस 📱',
        'hero.slide4.subtitle': 'कभी भी, कहीं भी अपने बजट को प्रबंधित करें।',
        'hero.btn.getstarted': 'शुरू करें',
        'hero.btn.startsaving': 'बचत शुरू करें',
        'hero.btn.tracknow': 'अभी ट्रैक करें',
        'hero.btn.downloadapp': 'ऐप डाउनलोड करें',
        'hero.btn.smarttrack': 'स्मार्ट ट्रैक',

        // Features Dropdown
        'features.expensetracking': 'खर्च ट्रैकिंग',
        'features.categorization': 'स्वचालित वर्गीकरण',
        'features.budgetplanning': 'मासिक बजट योजना',
        'features.reports': 'विज़ुअल रिपोर्ट और विश्लेषण',
        'features.alerts': 'अलर्ट और सूचनाएं',

        // Feature Sections
        'feature.food.label': 'भोजन और डाइनिंग',
        'feature.food.title': 'स्वादिष्ट बजट पर।',
        'feature.food.description': 'हर निवाले को ट्रैक करें और जिम्मेदारी से खाएं। देखें कि आपके खाने के शौक में कितना खर्च हो रहा है।',
        'feature.food.budgetused': 'बजट उपयोग',
        'feature.food.spent': 'खर्च',
        'feature.food.btn': 'भोजन विवरण देखें',

        'feature.travel.label': 'यात्रा और आवागमन',
        'feature.travel.title': 'जगह-जगह जाएं, पैसे बचाएं।',
        'feature.travel.description': 'दैनिक यात्रा से लेकर सपनों की छुट्टियों तक। अपने यात्रा खर्चों पर नज़र रखें।',
        'feature.travel.btn': 'यात्रा विवरण देखें',

        'feature.subscriptions.label': 'सदस्यताएं',
        'feature.subscriptions.title': 'आवर्ती लागत प्रबंधित करें।',
        'feature.subscriptions.description': 'Netflix, Spotify, जिम? छोटे आवर्ती शुल्क को अपने खाते को खाली न करने दें।',
        'feature.subscriptions.btn': 'सदस्यताएं देखें',

        'feature.bills.label': 'बिल और उपयोगिताएं',
        'feature.bills.title': 'कभी भी नियत तारीख न चूकें।',
        'feature.bills.description': 'बिजली, पानी और इंटरनेट बिलों पर नज़र रखें। रिमाइंडर प्राप्त करें।',
        'feature.bills.btn': 'बिल देखें',

        // Analytics Section
        'analytics.monthlybudget': 'मासिक बजट',
        'analytics.used': 'उपयोग किया',
        'analytics.spent': 'खर्च',
        'analytics.remaining': 'शेष',
        'analytics.limit': 'सीमा',
        'analytics.spendingcategories': 'खर्च श्रेणियां',
        'analytics.heatmap': 'दैनिक खर्च हीटमैप',
        'analytics.lessspend': 'कम खर्च',
        'analytics.morespend': 'अधिक खर्च 🔥',
        'analytics.topspending': 'शीर्ष 4 खर्च क्षेत्र:',
        'analytics.alerts': 'अलर्ट और जानकारी',

        // Days of Week
        'day.sun': 'रवि',
        'day.mon': 'सोम',
        'day.tue': 'मंगल',
        'day.wed': 'बुध',
        'day.thu': 'गुरु',
        'day.fri': 'शुक्र',
        'day.sat': 'शनि',

        // Categories
        'category.food': 'भोजन',
        'category.travel': 'यात्रा',
        'category.bills': 'बिल',
        'category.subscriptions': 'सदस्यताएं',

        // Budget Status Messages
        'budget.exceeded': '🚨 बजट पार हो गया! तुरंत खर्च सीमित करें।',
        'budget.critical': '⚠️ लगभग पहुंच गए! आगामी खर्चों से सावधान रहें।',
        'budget.halfway': '📊 आधे रास्ते में। ट्रैक करते रहें!',
        'budget.great': '✅ आप बहुत अच्छा कर रहे हैं! खर्च नियंत्रण में है।',

        // Notifications
        'notif.budgetexceeded': 'बजट पार हो गया! तुरंत खर्च बंद करें या अपनी सीमा जांचें।',
        'notif.budgetcritical': 'बजट गंभीर! आपने अपनी सीमा का 85% से अधिक उपयोग किया है।',
        'notif.highspend': 'उच्च खर्च का पता चला: ₹{amount} {category} पर',
        'notif.daysleft': 'महीने में {days} दिन बचे। \nसुरक्षित खर्च: ₹{amount}/दिन',
        'notif.tip': 'टिप: {tip}',

        // Tips
        'tip.cook': 'घर पर खाना बनाएं ~₹200/भोजन बचाएं।',
        'tip.rule': 'बचत के लिए 50/30/20 नियम आजमाएं।',
        'tip.unsubscribe': 'आज अप्रयुक्त ऐप्स से सदस्यता समाप्त करें।',
        'tip.save': 'खर्च से पहले आय का 10% बचाएं।',
        'tip.cash': 'अधिक खर्च सीमित करने के लिए नकद रखें।',
        'tip.track': 'छोटे खर्चों को ट्रैक करें; वे जुड़ते हैं!',

        // Footer
        'footer.about': 'के बारे में',
        'footer.press': 'प्रेस',
        'footer.blog': 'ब्लॉग',
        'footer.jobs': 'नौकरियां',
        'footer.calculators': 'कैलकुलेटर',
        'footer.api': 'API',
        'footer.account': 'खाता',
        'footer.login': 'लॉग इन',
        'footer.signup': 'साइन अप',
        'footer.resetpassword': 'पासवर्ड रीसेट करें',
        'footer.settings': 'सेटिंग्स',
        'footer.pro': 'बजट बडी प्रो',
        'footer.pay': 'बजट बडी पे',
        'footer.card': 'बजट बडी कार्ड',
        'footer.more': 'अधिक',
        'footer.contact': 'हमसे संपर्क करें',
        'footer.faq': 'FAQ',
        'footer.status': 'साइट स्थिति',
        'footer.terms': 'सेवा की शर्तें',
        'footer.privacy': 'गोपनीयता नीति',
        'footer.copyright': '© 2023 बजट बडी। सर्वाधिकार सुरक्षित।',

        // Modals - Login
        'modal.login.title': 'वापसी पर स्वागत है!',
        'modal.login.email': 'ईमेल पता',
        'modal.login.password': 'पासवर्ड',
        'modal.login.btn': 'लॉगिन',
        'modal.login.footer': 'खाता नहीं है?',
        'modal.login.signup': 'साइन अप',

        // Modals - Register
        'modal.register.title': 'खाता बनाएं',
        'modal.register.name': 'पूरा नाम',
        'modal.register.email': 'ईमेल पता',
        'modal.register.password': 'पासवर्ड',
        'modal.register.btn': 'साइन अप',
        'modal.register.footer': 'पहले से खाता है?',
        'modal.register.login': 'लॉगिन',

        // Modals - Budget
        'modal.budget.title': 'मासिक बजट सेट करें',
        'modal.budget.amount': 'बजट राशि (₹)',
        'modal.budget.btn': 'बजट अपडेट करें',

        // Modals - Profile
        'modal.profile.member': 'सदस्य बने',
        'modal.profile.monthlybudget': 'मासिक बजट',
        'modal.profile.totalspent': 'कुल खर्च',
        'modal.profile.editbtn': 'प्रोफाइल संपादित करें',
        'modal.profile.logoutbtn': 'लॉगआउट',

        // Modals - Category Analysis
        'modal.category.title': '📊 विश्लेषण',
        'modal.category.alltime': 'सभी समय',
        'modal.category.thismonth': 'इस महीने',
        'modal.category.lastmonth': 'पिछले महीने',
        'modal.category.last30days': 'पिछले 30 दिन',
        'modal.category.addexpense': '+ खर्च जोड़ें',
        'modal.category.close': 'बंद करें',
        'modal.category.totalspent': 'कुल खर्च',
        'modal.category.dailyavg': 'दैनिक औसत',

        // Day Details Modal
        'modal.day.title': '{date} को खर्च',
        'modal.day.loading': 'लोड हो रहा है...',
        'modal.day.noexpenses': 'इस दिन के लिए कोई खर्च नहीं मिला।',
        'modal.day.error': 'डेटा लोड करने में त्रुटि',

        // Messages
        'msg.budgetupdated': 'बजट सफलतापूर्वक अपडेट किया गया!',
        'msg.loginsuccess': 'लॉगिन सफल!',
        'msg.registersuccess': 'पंजीकरण सफल!',
        'msg.logoutsuccess': 'सफलतापूर्वक लॉग आउट किया गया!',
        'msg.error': 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
    },

    es: {
        // Navbar
        'nav.home': 'Inicio',
        'nav.features': 'Características',
        'nav.calculators': 'Calculadoras',
        'nav.contact': 'Contáctenos',
        'nav.login': 'Iniciar sesión',
        'nav.signup': 'Registrarse',
        'nav.hi': 'Hola',

        // Sidebar
        'sidebar.brand': 'Budget Buddy',
        'sidebar.dashboard': 'Panel',
        'sidebar.expenses': 'Gastos',
        'sidebar.budget': 'Presupuesto',
        'sidebar.insights': 'Perspectivas',
        'sidebar.profile': 'Perfil',
        'sidebar.logout': 'Cerrar sesión',

        // Hero Section
        'hero.slide1.title': 'Presupuesto Inteligente 📝',
        'hero.slide1.subtitle': 'Planifica tus gastos y mantente en tus objetivos.',
        'hero.slide2.title': 'Ahorra Más 💰',
        'hero.slide2.subtitle': 'Cada moneda ahorrada es un sueño futuro ganado.',
        'hero.slide3.title': 'Rastrea Impuestos y Facturas 📄',
        'hero.slide3.subtitle': 'Nunca pierdas una fecha límite. Mantén tus registros organizados.',
        'hero.slide4.title': 'Acceso Móvil 📱',
        'hero.slide4.subtitle': 'Administra tu presupuesto en cualquier momento, en cualquier lugar.',
        'hero.btn.getstarted': 'Comenzar',
        'hero.btn.startsaving': 'Comenzar a Ahorrar',
        'hero.btn.tracknow': 'Rastrear Ahora',
        'hero.btn.downloadapp': 'Descargar App',
        'hero.btn.smarttrack': 'Rastreo Inteligente',

        // Features Dropdown
        'features.expensetracking': 'Seguimiento de Gastos',
        'features.categorization': 'Categorización Automática',
        'features.budgetplanning': 'Planificación de Presupuesto Mensual',
        'features.reports': 'Informes Visuales y Análisis',
        'features.alerts': 'Alertas y Notificaciones',

        // Feature Sections
        'feature.food.label': 'Comida y Restaurantes',
        'feature.food.title': 'Deliciosamente en Presupuesto.',
        'feature.food.description': 'Rastrea cada bocado y disfruta responsablemente. Ve exactamente cuánto te están costando tus aventuras gastronómicas.',
        'feature.food.budgetused': 'Presupuesto Usado',
        'feature.food.spent': 'Gastado',
        'feature.food.btn': 'Ver Detalles de Comida',

        'feature.travel.label': 'Viajes y Transporte',
        'feature.travel.title': 'Ve a Lugares, Ahorra Dinero.',
        'feature.travel.description': 'Desde viajes diarios hasta vacaciones de ensueño. Mantén tus gastos de viaje bajo control.',
        'feature.travel.btn': 'Ver Detalles de Viaje',

        'feature.subscriptions.label': 'Suscripciones',
        'feature.subscriptions.title': 'Administra Costos Recurrentes.',
        'feature.subscriptions.description': '¿Netflix, Spotify, Gimnasio? No dejes que pequeños cargos recurrentes vacíen tu cuenta.',
        'feature.subscriptions.btn': 'Ver Suscripciones',

        'feature.bills.label': 'Facturas y Servicios',
        'feature.bills.title': 'Nunca Pierdas una Fecha de Vencimiento.',
        'feature.bills.description': 'Mantente al día con las facturas de electricidad, agua e internet. Recibe recordatorios.',
        'feature.bills.btn': 'Ver Facturas',

        // Analytics Section
        'analytics.monthlybudget': 'Presupuesto Mensual',
        'analytics.used': 'usado',
        'analytics.spent': 'Gastado',
        'analytics.remaining': 'Restante',
        'analytics.limit': 'Límite',
        'analytics.spendingcategories': 'Categorías de Gastos',
        'analytics.heatmap': 'Mapa de Calor de Gastos Diarios',
        'analytics.lessspend': 'Menos Gasto',
        'analytics.morespend': 'Más Gasto 🔥',
        'analytics.topspending': 'Top 4 Áreas de Gasto:',
        'analytics.alerts': 'Alertas y Perspectivas',

        // Days of Week
        'day.sun': 'Dom',
        'day.mon': 'Lun',
        'day.tue': 'Mar',
        'day.wed': 'Mié',
        'day.thu': 'Jue',
        'day.fri': 'Vie',
        'day.sat': 'Sáb',

        // Categories
        'category.food': 'Comida',
        'category.travel': 'Viaje',
        'category.bills': 'Facturas',
        'category.subscriptions': 'Suscripciones',

        // Budget Status Messages
        'budget.exceeded': '🚨 ¡Presupuesto Excedido! Limita tu gasto inmediatamente.',
        'budget.critical': '⚠️ ¡Casi llegando! Ten cuidado con los próximos gastos.',
        'budget.halfway': '📊 A mitad de camino. ¡Sigue rastreando!',
        'budget.great': '✅ ¡Lo estás haciendo genial! El gasto está bajo control.',

        // Notifications
        'notif.budgetexceeded': '¡Presupuesto Excedido! Deja de gastar inmediatamente o verifica tu límite.',
        'notif.budgetcritical': '¡Presupuesto Crítico! Has usado más del 85% de tu límite.',
        'notif.highspend': 'Gasto alto detectado: ₹{amount} en {category}',
        'notif.daysleft': '{days} días restantes en el mes. \nSeguro para gastar: ₹{amount}/día',
        'notif.tip': 'Consejo: {tip}',

        // Tips
        'tip.cook': 'Cocina en casa para ahorrar ~₹200/comida.',
        'tip.rule': 'Prueba la regla 50/30/20 para ahorros.',
        'tip.unsubscribe': 'Cancela suscripciones de apps no usadas hoy.',
        'tip.save': 'Ahorra el 10% de los ingresos antes de gastar.',
        'tip.cash': 'Lleva efectivo para limitar el gasto excesivo.',
        'tip.track': '¡Rastrea pequeños gastos; se suman!',

        // Footer
        'footer.about': 'Acerca de',
        'footer.press': 'Prensa',
        'footer.blog': 'Blog',
        'footer.jobs': 'Empleos',
        'footer.calculators': 'Calculadoras',
        'footer.api': 'API',
        'footer.account': 'Cuenta',
        'footer.login': 'Iniciar sesión',
        'footer.signup': 'Registrarse',
        'footer.resetpassword': 'Restablecer contraseña',
        'footer.settings': 'Configuración',
        'footer.pro': 'Budget Buddy Pro',
        'footer.pay': 'Budget Buddy Pay',
        'footer.card': 'Budget Buddy Card',
        'footer.more': 'Más',
        'footer.contact': 'Contáctenos',
        'footer.faq': 'FAQ',
        'footer.status': 'Estado del sitio',
        'footer.terms': 'Términos de Servicio',
        'footer.privacy': 'Política de Privacidad',
        'footer.copyright': '© 2023 Budget Buddy. Todos los derechos reservados.',

        // Modals - Login
        'modal.login.title': '¡Bienvenido de Nuevo!',
        'modal.login.email': 'Correo Electrónico',
        'modal.login.password': 'Contraseña',
        'modal.login.btn': 'Iniciar sesión',
        'modal.login.footer': '¿No tienes una cuenta?',
        'modal.login.signup': 'Registrarse',

        // Modals - Register
        'modal.register.title': 'Crear Cuenta',
        'modal.register.name': 'Nombre Completo',
        'modal.register.email': 'Correo Electrónico',
        'modal.register.password': 'Contraseña',
        'modal.register.btn': 'Registrarse',
        'modal.register.footer': '¿Ya tienes una cuenta?',
        'modal.register.login': 'Iniciar sesión',

        // Modals - Budget
        'modal.budget.title': 'Establecer Presupuesto Mensual',
        'modal.budget.amount': 'Cantidad de Presupuesto (₹)',
        'modal.budget.btn': 'Actualizar Presupuesto',

        // Modals - Profile
        'modal.profile.member': 'Miembro desde',
        'modal.profile.monthlybudget': 'Presupuesto Mensual',
        'modal.profile.totalspent': 'Total Gastado',
        'modal.profile.editbtn': 'Editar Perfil',
        'modal.profile.logoutbtn': 'Cerrar sesión',

        // Modals - Category Analysis
        'modal.category.title': '📊 Análisis',
        'modal.category.alltime': 'Todo el Tiempo',
        'modal.category.thismonth': 'Este Mes',
        'modal.category.lastmonth': 'Mes Pasado',
        'modal.category.last30days': 'Últimos 30 Días',
        'modal.category.addexpense': '+ Agregar Gasto',
        'modal.category.close': 'Cerrar',
        'modal.category.totalspent': 'Total Gastado',
        'modal.category.dailyavg': 'Promedio Diario',

        // Day Details Modal
        'modal.day.title': 'Gastos del {date}',
        'modal.day.loading': 'Cargando...',
        'modal.day.noexpenses': 'No se encontraron gastos para este día.',
        'modal.day.error': 'Error al cargar datos',

        // Messages
        'msg.budgetupdated': '¡Presupuesto Actualizado Exitosamente!',
        'msg.loginsuccess': '¡Inicio de Sesión Exitoso!',
        'msg.registersuccess': '¡Registro Exitoso!',
        'msg.logoutsuccess': '¡Sesión Cerrada Exitosamente!',
        'msg.error': 'Ocurrió un error. Por favor, inténtalo de nuevo.',
    },

    fr: {
        // Navbar
        'nav.home': 'Accueil',
        'nav.features': 'Fonctionnalités',
        'nav.calculators': 'Calculatrices',
        'nav.contact': 'Nous Contacter',
        'nav.login': 'Connexion',
        'nav.signup': 'S\'inscrire',
        'nav.hi': 'Salut',

        // Sidebar
        'sidebar.brand': 'Budget Buddy',
        'sidebar.dashboard': 'Tableau de Bord',
        'sidebar.expenses': 'Dépenses',
        'sidebar.budget': 'Budget',
        'sidebar.insights': 'Aperçus',
        'sidebar.profile': 'Profil',
        'sidebar.logout': 'Déconnexion',

        // Hero Section
        'hero.slide1.title': 'Budgétisation Intelligente 📝',
        'hero.slide1.subtitle': 'Planifiez vos dépenses et respectez vos objectifs.',
        'hero.slide2.title': 'Économisez Plus 💰',
        'hero.slide2.subtitle': 'Chaque pièce économisée est un rêve futur gagné.',
        'hero.slide3.title': 'Suivez les Impôts et Factures 📄',
        'hero.slide3.subtitle': 'Ne manquez jamais une échéance. Gardez vos dossiers organisés.',
        'hero.slide4.title': 'Accès Mobile 📱',
        'hero.slide4.subtitle': 'Gérez votre budget à tout moment, n\'importe où.',
        'hero.btn.getstarted': 'Commencer',
        'hero.btn.startsaving': 'Commencer à Économiser',
        'hero.btn.tracknow': 'Suivre Maintenant',
        'hero.btn.downloadapp': 'Télécharger l\'App',
        'hero.btn.smarttrack': 'Suivi Intelligent',

        // Features Dropdown
        'features.expensetracking': 'Suivi des Dépenses',
        'features.categorization': 'Catégorisation Automatique',
        'features.budgetplanning': 'Planification Budgétaire Mensuelle',
        'features.reports': 'Rapports Visuels et Analyses',
        'features.alerts': 'Alertes et Notifications',

        // Feature Sections
        'feature.food.label': 'Nourriture et Restaurants',
        'feature.food.title': 'Délicieusement dans le Budget.',
        'feature.food.description': 'Suivez chaque bouchée et savourez de manière responsable. Voyez exactement combien vos aventures culinaires vous coûtent.',
        'feature.food.budgetused': 'Budget Utilisé',
        'feature.food.spent': 'Dépensé',
        'feature.food.btn': 'Voir Détails Nourriture',

        'feature.travel.label': 'Voyages et Déplacements',
        'feature.travel.title': 'Voyagez, Économisez de l\'Argent.',
        'feature.travel.description': 'Des trajets quotidiens aux vacances de rêve. Gardez vos dépenses de voyage sous contrôle.',
        'feature.travel.btn': 'Voir Détails Voyage',

        'feature.subscriptions.label': 'Abonnements',
        'feature.subscriptions.title': 'Gérez les Coûts Récurrents.',
        'feature.subscriptions.description': 'Netflix, Spotify, Gym? Ne laissez pas les petits frais récurrents vider votre compte.',
        'feature.subscriptions.btn': 'Voir Abonnements',

        'feature.bills.label': 'Factures et Services',
        'feature.bills.title': 'Ne Manquez Jamais une Échéance.',
        'feature.bills.description': 'Restez au courant des factures d\'électricité, d\'eau et d\'internet. Recevez des rappels.',
        'feature.bills.btn': 'Voir Factures',

        // Analytics Section
        'analytics.monthlybudget': 'Budget Mensuel',
        'analytics.used': 'utilisé',
        'analytics.spent': 'Dépensé',
        'analytics.remaining': 'Restant',
        'analytics.limit': 'Limite',
        'analytics.spendingcategories': 'Catégories de Dépenses',
        'analytics.heatmap': 'Carte de Chaleur des Dépenses Quotidiennes',
        'analytics.lessspend': 'Moins de Dépenses',
        'analytics.morespend': 'Plus de Dépenses 🔥',
        'analytics.topspending': 'Top 4 des Zones de Dépenses:',
        'analytics.alerts': 'Alertes et Aperçus',

        // Days of Week
        'day.sun': 'Dim',
        'day.mon': 'Lun',
        'day.tue': 'Mar',
        'day.wed': 'Mer',
        'day.thu': 'Jeu',
        'day.fri': 'Ven',
        'day.sat': 'Sam',

        // Categories
        'category.food': 'Nourriture',
        'category.travel': 'Voyage',
        'category.bills': 'Factures',
        'category.subscriptions': 'Abonnements',

        // Budget Status Messages
        'budget.exceeded': '🚨 Budget Dépassé! Limitez vos dépenses immédiatement.',
        'budget.critical': '⚠️ Presque là! Attention aux dépenses à venir.',
        'budget.halfway': '📊 À mi-chemin. Continuez à suivre!',
        'budget.great': '✅ Vous faites du bon travail! Les dépenses sont sous contrôle.',

        // Notifications
        'notif.budgetexceeded': 'Budget Dépassé! Arrêtez de dépenser immédiatement ou vérifiez votre limite.',
        'notif.budgetcritical': 'Budget Critique! Vous avez utilisé plus de 85% de votre limite.',
        'notif.highspend': 'Dépense élevée détectée: ₹{amount} sur {category}',
        'notif.daysleft': '{days} jours restants dans le mois. \nSûr de dépenser: ₹{amount}/jour',
        'notif.tip': 'Conseil: {tip}',

        // Tips
        'tip.cook': 'Cuisinez à la maison pour économiser ~₹200/repas.',
        'tip.rule': 'Essayez la règle 50/30/20 pour les économies.',
        'tip.unsubscribe': 'Désabonnez-vous des apps inutilisées aujourd\'hui.',
        'tip.save': 'Économisez 10% des revenus avant de dépenser.',
        'tip.cash': 'Portez de l\'argent liquide pour limiter les dépenses excessives.',
        'tip.track': 'Suivez les petites dépenses; elles s\'additionnent!',

        // Footer
        'footer.about': 'À Propos',
        'footer.press': 'Presse',
        'footer.blog': 'Blog',
        'footer.jobs': 'Emplois',
        'footer.calculators': 'Calculatrices',
        'footer.api': 'API',
        'footer.account': 'Compte',
        'footer.login': 'Se connecter',
        'footer.signup': 'S\'inscrire',
        'footer.resetpassword': 'Réinitialiser le mot de passe',
        'footer.settings': 'Paramètres',
        'footer.pro': 'Budget Buddy Pro',
        'footer.pay': 'Budget Buddy Pay',
        'footer.card': 'Budget Buddy Card',
        'footer.more': 'Plus',
        'footer.contact': 'Nous contacter',
        'footer.faq': 'FAQ',
        'footer.status': 'État du site',
        'footer.terms': 'Conditions de Service',
        'footer.privacy': 'Politique de Confidentialité',
        'footer.copyright': '© 2023 Budget Buddy. Tous droits réservés.',

        // Modals - Login
        'modal.login.title': 'Bon Retour!',
        'modal.login.email': 'Adresse E-mail',
        'modal.login.password': 'Mot de Passe',
        'modal.login.btn': 'Connexion',
        'modal.login.footer': 'Vous n\'avez pas de compte?',
        'modal.login.signup': 'S\'inscrire',

        // Modals - Register
        'modal.register.title': 'Créer un Compte',
        'modal.register.name': 'Nom Complet',
        'modal.register.email': 'Adresse E-mail',
        'modal.register.password': 'Mot de Passe',
        'modal.register.btn': 'S\'inscrire',
        'modal.register.footer': 'Vous avez déjà un compte?',
        'modal.register.login': 'Connexion',

        // Modals - Budget
        'modal.budget.title': 'Définir le Budget Mensuel',
        'modal.budget.amount': 'Montant du Budget (₹)',
        'modal.budget.btn': 'Mettre à Jour le Budget',

        // Modals - Profile
        'modal.profile.member': 'Membre depuis',
        'modal.profile.monthlybudget': 'Budget Mensuel',
        'modal.profile.totalspent': 'Total Dépensé',
        'modal.profile.editbtn': 'Modifier le Profil',
        'modal.profile.logoutbtn': 'Déconnexion',

        // Modals - Category Analysis
        'modal.category.title': '📊 Analyse',
        'modal.category.alltime': 'Tout le Temps',
        'modal.category.thismonth': 'Ce Mois',
        'modal.category.lastmonth': 'Mois Dernier',
        'modal.category.last30days': '30 Derniers Jours',
        'modal.category.addexpense': '+ Ajouter Dépense',
        'modal.category.close': 'Fermer',
        'modal.category.totalspent': 'Total Dépensé',
        'modal.category.dailyavg': 'Moyenne Quotidienne',

        // Day Details Modal
        'modal.day.title': 'Dépenses du {date}',
        'modal.day.loading': 'Chargement...',
        'modal.day.noexpenses': 'Aucune dépense trouvée pour ce jour.',
        'modal.day.error': 'Erreur de chargement des données',

        // Messages
        'msg.budgetupdated': 'Budget Mis à Jour avec Succès!',
        'msg.loginsuccess': 'Connexion Réussie!',
        'msg.registersuccess': 'Inscription Réussie!',
        'msg.logoutsuccess': 'Déconnexion Réussie!',
        'msg.error': 'Une erreur s\'est produite. Veuillez réessayer.',
    }
};

// Current language
let currentLanguage = localStorage.getItem('budgetBuddyLanguage') || 'en';

// Translation function with parameter substitution
window.t = function (key, params = {}) {
    const translation = translations[currentLanguage]?.[key] || translations['en'][key] || key;

    // Replace parameters in the translation
    let result = translation;
    Object.keys(params).forEach(param => {
        result = result.replace(`{${param}}`, params[param]);
    });

    return result;
};

// Format number according to locale
window.formatNumber = function (number) {
    return number.toLocaleString();
};

// Format currency according to locale
window.formatCurrency = function (amount) {
    return `₹${amount.toLocaleString()}`;
};

// Switch language function
window.switchLanguage = function (langCode) {
    if (!translations[langCode]) {
        console.error(`Language ${langCode} not supported`);
        return;
    }

    currentLanguage = langCode;
    localStorage.setItem('budgetBuddyLanguage', langCode);

    // Update all elements with data-i18n attribute
    updatePageTranslations();

    // Trigger custom event for dynamic content updates
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }));

    console.log(`Language switched to: ${langCode}`);
};

// Update all static text elements with data-i18n attributes
function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = window.t(key);

        // Update text content or placeholder based on element type
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            }
        } else {
            element.textContent = translation;
        }
    });

    // Update elements with data-i18n-html attribute (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        element.innerHTML = window.t(key);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updatePageTranslations();
});

// Export current language getter
window.getCurrentLanguage = function () {
    return currentLanguage;
};

console.log('i18n module loaded. Current language:', currentLanguage);
