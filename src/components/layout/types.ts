export type RailItem = {
  label: string;
  href: string;
  type?: 'anchor' | 'route';
  icon:
    | 'home'
    | 'how'
    | 'problem'
    | 'solution'
    | 'benefits'
    | 'demos'
    | 'blog'
    | 'industries'
    | 'process'
    | 'contact-nav';
};
