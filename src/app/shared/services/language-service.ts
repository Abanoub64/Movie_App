import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal(localStorage.getItem('language') || 'en');

  private translations: any = {
 en: {
      movies: 'Movies',
      tvShows: 'TV Shows',
      popular: 'Popular',
      nowPlaying: 'Now Playing',
      upcoming: 'Upcoming',
      topRated: 'Top Rated',
      airingToday: 'Airing Today',
      onTv: 'On TV',
      home: 'Home',
      wishlist: 'Wish List',
      login: 'Log in',
      signup: 'Sign Up',
      account: 'Account Details',
      logout: 'Logout',
      search: 'Search',
      searchAndExplore: 'Search and explore...',
      searchResults: 'Search Results',
    },
    ar: {
      movies: 'الأفلام',
      tvShows: 'المسلسلات',
      popular: 'الأكثر شهرة',
      nowPlaying: 'يعرض الآن',
      upcoming: 'القادمة',
      topRated: 'الأعلى تقييمًا',
      airingToday: 'يُعرض اليوم',
      onTv: 'على التلفاز',
      home: 'الرئيسية',
      wishlist: 'قائمة المفضلة',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      account: 'تفاصيل الحساب',
      logout: 'تسجيل الخروج',
      search: 'بحث',
      searchAndExplore: 'ابحث واستكشف...',
      searchResults: 'نتائج البحث',
    },
    fr: {
      movies: 'Films',
      tvShows: 'Séries TV',
      popular: 'Populaire',
      nowPlaying: 'En Salle',
      upcoming: 'À Venir',
      topRated: 'Les Mieux Notés',
      airingToday: 'Diffusé Aujourd\'hui',
      onTv: 'À la Télé',
      home: 'Accueil',
      wishlist: 'Liste de Souhaits',
      login: 'Connexion',
      signup: 'S\'inscrire',
      account: 'Détails du Compte',
      logout: 'Se Déconnecter',
      search: 'Rechercher',
      searchAndExplore: 'Rechercher et explorer...',
      searchResults: 'Résultats de recherche',
    },
    zh: {
      movies: '电影',
      tvShows: '电视剧',
      popular: '热门',
      nowPlaying: '正在上映',
      upcoming: '即将上映',
      topRated: '高评分',
      airingToday: '今日播出',
      onTv: '电视上',
      home: '主页',
      wishlist: '愿望清单',
      login: '登录',
      signup: '注册',
      account: '账户详情',
      logout: '登出',
      search: '搜索',
      searchAndExplore: '搜索与探索...',
      searchResults: '搜索结果',
    },

  };
  constructor() {
    effect(() => {
      const lang = this.currentLanguage();
      document.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('language', lang);
    });
  }
  setLanguage(lang: string) {
    this.currentLanguage.set(lang);
  }
  t(key: string): string {
    const lang = this.currentLanguage();
    return this.translations[lang][key] || key;
  }
}
