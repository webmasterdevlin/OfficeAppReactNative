import React, { Component } from "react";

import {
  Container,
  Footer,
  Content,
  Form,
  Input,
  Item,
  Icon
} from "native-base";
import { StyleSheet } from "react-native";
import { postDepartment } from "./DepartmentService";
import { getJwt } from "../auth/AuthService";
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

class NewDepartment extends Component {
  state = {
    department: {
      name: null,
      description: null,
      head: null,
      code: null
    },
    sent: false,
    error: "",
    showNameInputError: false,
    showNameInputSuccess: false,
    showNameInputDisabled: false
  };

  handleOnChangeText = (key, val) => {
    let department = { ...this.state.department };
    department[key] = val;

    if (!department[key]) {
      this.setState({ showNameInputError: true });
      return;
    }
    this.setState({
      showNameInputError: false,
      showNameInputSuccess: true,
      department
    });
  };

  handleSubmit = async () => {
    const token = await getJwt();
    const { showNameInputError, department } = this.state;
    if (department.name == null || showNameInputError) {
      this.setState({ showNameInputError: true });
      return;
    }
    try {
      await postDepartment(this.state.department, token);
      this.setState({
        showNameInputSuccess: false,
        showNameInputDisabled: true,
        sent: true
      });
      this.handleGoBack();
    } catch (error) {
      alert("Something happened. Cannot process now.");
      this.setState({ error });
      this.handleGoBack();
    }
  };

  handleGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onRefresh({ selected: true });
  };

  render() {
    const {
      showNameInputSuccess,
      showNameInputError,
      showNameInputDisabled
    } = this.state;
    return (
      <Container>
        <Content>
          <Form>
            <Item success={showNameInputSuccess} error={showNameInputError}>
              <Input
                placeholder="name"
                disabled={showNameInputDisabled}
                onChangeText={text => this.handleOnChangeText("name", text)}
              />
              {showNameInputSuccess && <Icon name="checkmark-circle" />}
              {showNameInputDisabled && <Icon name="information-circle" />}
            </Item>

            <Item>
              <Input
                placeholder="description"
                onChangeText={text =>
                  this.handleOnChangeText("description", text)
                }
              />
            </Item>
            <Item>
              <Input
                placeholder="head"
                onChangeText={text => this.handleOnChangeText("head", text)}
              />
            </Item>
            <Item>
              <Input
                placeholder="code"
                onChangeText={text => this.handleOnChangeText("code", text)}
              />
            </Item>
            <ActionButton
              disabled={this.state.sent}
              success={true}
              info={false}
              Title="Add"
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

export default NewDepartment;
