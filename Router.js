import { createAppContainer, createStackNavigator } from "react-navigation";
import DepartmentList from "../OfficeAppReactNative/src/department/DepartmentList";
import EditDepartment from "../OfficeAppReactNative/src/department/EditDepartment";
import NewDepartment from "../OfficeAppReactNative/src/department/NewDepartment";
import Login from "../OfficeAppReactNative/src/auth/login/login";

const MainNavigator = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: () => ({
      header: null,
      headerTintColor: "#F4F3EE"
    })
  },
  departmentList: {
    screen: DepartmentList,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  },
  editDepartment: {
    screen: EditDepartment,
    navigationOptions: () => ({
      title: "Edit",
      headerLeft: null,
      headerTintColor: "#F4F3EE",
      headerStyle: {
        backgroundColor: "indigo"
      }
    })
  },
  newDepartment: {
    screen: NewDepartment,
    navigationOptions: () => ({
      title: "New",
      headerTintColor: "#F4F3EE",
      headerLeft: null,
      headerStyle: {
        backgroundColor: "indigo"
      }
    })
  }
});

const Router = createAppContainer(MainNavigator);

export default Router;
