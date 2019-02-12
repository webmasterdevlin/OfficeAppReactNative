import React, { Component } from "react";
import { StyleSheet, Alert, RefreshControl } from "react-native";
import {
  Container,
  Header,
  Footer,
  Content,
  View,
  Text,
  Button,
  Icon,
  Title,
  Body,
  Left,
  Right,
  SwipeRow
} from "native-base";
import { deleteDepartment, getDepartments } from "./DepartmentService";
import { getJwt, logOut } from "../auth/AuthService";

class DepartmentList extends Component {
  state = {
    error: null,
    refreshing: false,
    isShowNewItemForm: false,
    department: {
      id: null,
      name: null,
      description: null,
      head: null,
      code: null
    },
    departments: []
  };

  async componentDidMount() {
    this._loadDepartments();
  }

  handleNewDepartment = screenName => {
    this.props.navigation.navigate(screenName, { onRefresh: this._onRefresh });
  };

  handleEditDepartment = (screenName, id) => {
    this.props.navigation.navigate(screenName, {
      id,
      onRefresh: this._onRefresh
    });
  };

  handleDeleteDepartment = department => {
    this._confirmDeletion(department);
  };

  handleLogout = async () => {
    await logOut();
    this.props.navigation.popToTop();
  };

  _loadDepartments = async () => {
    const token = await getJwt();
    try {
      const { data } = await getDepartments(token);
      this.setState({ departments: data });
    } catch (e) {
      this.setState({ error: e });
      alert(`Something happened: ${e}`);
    }
  };

  _onRefresh = async () => {
    const token = await getJwt();
    this.setState({ refreshing: true });
    const { data } = await getDepartments(token);
    if (data) this.setState({ refreshing: false });
    this.setState({ departments: data });
  };

  _confirmDeletion = async department => {
    Alert.alert(
      "Deleting department",
      "Are you sure you want to delete this department?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              await this._deleteDepartment(department);
            } catch (error) {
              alert(`Something happened: ${e}`);
              this.setState({ error });
            }
          }
        }
      ]
    );
  };

  _deleteDepartment = async department => {
    const token = await getJwt();
    let previousDepartments;
    try {
      previousDepartments = this.state.departments;
      const departments = this.state.departments.filter(
        d => d.id !== department.id
      );
      await deleteDepartment(department, token);
      this.setState({ departments });
    } catch (error) {
      this.setState({ error });
      alert("Something happened. Cannot process now.");
      this.setState({ departments: previousDepartments });
    }
  };

  render() {
    const { departments } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: "indigo" }}>
          <Left>
            <Text onPress={() => this.handleLogout()} note>
              logout
            </Text>
          </Left>
          <Body style={{ alignItems: "center" }}>
            <Title style={{ color: "white" }}>List</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.handleNewDepartment("newDepartment")}
            >
              <Icon name="add" style={{ color: "white" }} />
            </Button>
          </Right>
        </Header>
        <Content
          scrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {departments.map(d => (
            <SwipeRow
              key={d.id}
              leftOpenValue={75}
              rightOpenValue={-75}
              left={
                <Button
                  success
                  onPress={() =>
                    this.handleEditDepartment("editDepartment", d.id)
                  }
                >
                  <Icon active name="create" />
                </Button>
              }
              body={
                <View style={styles.cell}>
                  <View>
                    <Text>{d.name}</Text>
                    <Text note>{d.description}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{d.head}</Text>
                  </View>
                </View>
              }
              right={
                <Button danger onPress={() => this.handleDeleteDepartment(d)}>
                  <Icon active name="trash" />
                </Button>
              }
            />
          ))}
        </Content>
        <Footer style={styles.footer}>
          <Text style={styles.footerText} note>
            Total number of departments: {departments.length}
          </Text>
        </Footer>
      </Container>
    );
  }
}

export default DepartmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20
  },
  cell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  footer: {
    backgroundColor: "indigo",
    alignItems: "center"
  },
  footerText: {
    color: "white"
  }
});
