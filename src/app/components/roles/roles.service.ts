export interface IRole {
  id?: string;
  name: string;
  description: string;
  privileges: Array<string>;
  isSelected?:boolean
}
export class Role implements IRole{
  constructor(
  public name: string,
  public description: string,
  public privileges: Array<string>,
  public id?: string){}
}
export class rolesService {
  private avalPrivileges : Array<string>=[];
  /** @ngInject */
  constructor (private $log: angular.ILogService, private $http: angular.IHttpService) {
    
  }
   //for converting roles which comes from server as object to array for convenience 
  private convertToArray(myObj){
   return Object.keys(myObj).map(x => {    
     return new Role( myObj[x].name, myObj[x].description, myObj[x].privileges, x);
    });
  } 

  //--service public methods 
  getRoles(): angular.IPromise<IRole[]>{
    return this.$http.get('/api/roles')
    .then((response: any): IRole[] => {
       //lets store all priviledges
       this.avalPrivileges = response.data.privileges;
       return this.convertToArray(response.data.roles);
    })
    .catch((error: any): any => {
      this.$log.error('XHR Failed for getContributors.\n', error.data);
    });
  }
  delRole(id): angular.IPromise<any[]>{
    return this.$http.delete('/api/roles/'+id+'/delete').then((response: any): any => {
        console.log('success')
    })
    .catch((error: any): any => {
        this.$log.error('XHR Failed to delete.\n', error.data);
    });
  }
  createRole(role): angular.IPromise<any[]>{
    return this.$http.post('/api/roles/create',role).then((response: any): any => {
         return  'data saved successfully';
    })
    .catch((error: any): any => {
        this.$log.error('XHR Failed create role.\n', error.data);
        throw error.data;
    });
  }
  editRole(id, role): angular.IPromise<any[]>{
    return this.$http.post('/api/roles/'+id+'/update',role).then((response: any): any => {
        return  'data saved successfully';
    }).catch((error: any): any => {
        this.$log.error('XHR Failed for getContributors.\n', error.data);
        throw error.data;
    });
  }

  getAllPrivileges() : Array<string>{
    return this.avalPrivileges || [];
  }
  getRoleDetails(id): angular.IPromise<any[]>{
    return this.$http.get('/api/roles').then((response: any): any => {
       return response.data.roles[id];
    })
    .catch((error: any): any => {
      this.$log.error('XHR Failed find role.\n', error.data);
    });
  } 
 //--END of public methods
}
