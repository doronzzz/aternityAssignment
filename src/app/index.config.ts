/** @ngInject */
export function config($logProvider: angular.ILogProvider, toastrConfig: any) {
  // enable log
  $logProvider.debugEnabled(true);
  // set options third-party lib
  
  //DORON: use an object
  //DORON: toastrConfig = {
    //timeout:3000,
    //allowHtml: true
  //}
  
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
 // toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
