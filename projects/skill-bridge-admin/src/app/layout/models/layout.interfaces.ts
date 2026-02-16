export interface NavBarItem {
  name: string;
  link: string;               
  usertype: string[];         
  activeClass?: string;         
  iconClass?: string;             
  queryParams?: any;             
}