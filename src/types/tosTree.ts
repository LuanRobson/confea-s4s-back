interface Category {
    subgroups: boolean;
    name: string;
    code: string;
    children?: (Category | Activity)[];
  }
  
  interface Activity {
    name: string;
    code: string;
  }