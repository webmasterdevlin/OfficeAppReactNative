import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { getDepartment, putDepartment } from "./DepartmentService";
import { Container, Footer, Content, Form, Input, Item } from "native-base";
import { getJwt, storedTokenIsValid } from "../auth/AuthService";
import BackButton from "../components/BackButton";
import ActionButton from "../components/ActionButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  },
  footer: {
    backgroundColor: "indigo",
    alignItems: "center"
  },
  footerText: {
    color: "white"
  }
});

class EditDepartment extends Component {
  state = {
    department: {
      id: "",
      name: "",
      description: "",
      head: "",
      code: ""
    },
    sent: false,
    error: ""
  };

  async componentDidMount() {
    await this._loadDepartment()
  }

  handleOnChangeText = (key, val) => {
    let department = { ...this.state.department };
    department[key] = val;
    this.setState({ department });
  };

  handleSubmit = async () => {
    if (!storedTokenIsValid())  this.props.navigation.popToTop();

    const token = await getJwt();
    try {
      await putDepartment(this.state.department, token);
      this.setState({ sent: true });
      this.handleGoBack();
    } catch (error) {
      alert("Something happened. Cannot process now.");
      this.setState({ error });
    }
  };

  handleGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onRefresh({ selected: true });
  };

  _loadDepartment = async () => {
    if (!storedTokenIsValid())  this.props.navigation.popToTop();

    const token = await getJwt();
    try {
      const id = this.props.navigation.getParam("id");
      const { data } = await getDepartment(id, token);
      this.setState({ department: data });
    } catch (e) {
      this.handleGoBack();
    }
  }

  render() {
    const { name, description, head, code } = this.state.department;
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder={name}
                onChangeText={text => this.handleOnChangeText("name", text)}
              />
            </Item>
            <Item>
              <Input
                placeholder={description}
                onChangeText={text =>
                  this.handleOnChangeText("description", text)
                }
              />
            </Item>
            <Item>
              <Input
                placeholder={head}
                onChangeText={text => this.handleOnChangeText("head", text)}
              />
            </Item>
            <Item>
              <Input
                placeholder={code}
                onChangeText={text => this.handleOnChangeText("code", text)}
              />
            </Item>
            <ActionButton
              disabled={this.state.sent}
              success={false}
              info={true}
              Title="Update"
              onPress={this.handleSubmit}
            />
            <BackButton onPress={this.handleGoBack} />
          </Form>
        </Content>
        <Footer style={styles.footer} />
      </Container>
    );
  }
}

export default EditDepartment;
