import React, { Component } from "react";
import { StyleSheet, ImageBackground, Image, Dimensions } from "react-native";
import bg from "../../assets/images/officebg.jpeg";
import logo from "../../assets/images/company_logo.png";

import {
  Container,
  Content,
  View,
  Text,
  Form,
  Input,
  Item,
  Button,
  Icon,
  H1
} from "native-base";
import { postLogin, postRegistration } from "../../user/UserService";
import { routeCanActivate, storeToken } from "../AuthService";
class Login extends Component {
  state = {
    userModel: {
      username: null,
      email: null,
      password: null
    },
    confirmPassword: null,
    loggingIn: true
  };

  async componentDidMount() {
    await this._handleAuthenticated();
  }

  handleOnChangeText = (key, val) => {
    this._formToUserModel(key, val);
  };

  handleOnSubmit = async () => {
    await this._onSubmit();
  };

  _formToUserModel = (key, val) => {
    if (key !== "confirmPassword") {
      let userModel = { ...this.state.userModel };
      userModel[key] = val;
      this.setState({ userModel });
    }
    this.setState({ confirmPassword: val });
  };

  _handleAuthenticated = async () => {
    if (await routeCanActivate()) {
      this.props.navigation.navigate("departmentList");
    }
  };

  _checkPassword = () => {
    const { confirmPassword, userModel } = this.state;
    if (confirmPassword !== userModel.password) {
      alert(`password and confirm password don't match`);
      return false;
    } else {
      return true;
    }
  };

  _onSubmit = async () => {
    const { loggingIn, userModel } = this.state;
    if (loggingIn) {
      try {
        await this._submitLoginDetails(userModel);
      } catch (e) {
        alert("Something happened. Can't process right now.");
      }
    } else {
      await this._submitRegistrationDetails(userModel);
      try {
      } catch (e) {
        alert("Something happened. Can't process right now.");
      }
    }
  };

  _submitLoginDetails = async userModel => {
    const { data: jwt, status } = await postLogin(userModel);
    await storeToken(jwt.token);
    if (status === 200) {
      this.props.navigation.navigate("departmentList");
    } else {
      alert("Unauthorized. Retype username & password");
    }
  };

  _submitRegistrationDetails = async userModel => {
    if (!this._checkPassword()) return;
    const { status } = await postRegistration(userModel);
    if (status === 200) {
      alert("Registration successful");
      await this._submitLoginDetails(userModel);
    } else {
      alert("Something happened. Can't process right now.");
    }
  };

  render() {
    const { loggingIn } = this.state;
    return (
      <Container>
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Content>
            <ImageBackground source={bg} style={{ flex: 1 }}>
              <View style={styles.form}>
                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 72,
                    marginBottom: 72
                  }}
                >
                  <Image
                    style={{
                      width: 200,
                      height: 200
                    }}
                    source={logo}
                  />
                  <H1 style={{ color: "orange" }}>Office App</H1>
                </View>

                <Form>
                  {!loggingIn && (
                    <Item style={{ marginBottom: 10 }} rounded>
                      <Icon style={{ color: "#fff" }} name="person" />
                      <Input
                        style={{ color: "#fff" }}
                        placeholder="Please Enter Username"
                        placeholderTextColor="#fff"
                        onChangeText={text =>
                          this.handleOnChangeText("username", text)
                        }
                      />
                    </Item>
                  )}
                  <Item style={{ marginBottom: 10 }} rounded>
                    <Icon style={{ color: "#fff" }} name="mail" />
                    <Input
                      style={{ color: "#fff" }}
                      placeholder="Please Enter Email"
                      placeholderTextColor="#fff"
                      onChangeText={text =>
                        this.handleOnChangeText("email", text)
                      }
                    />
                  </Item>
                  <Item style={{ marginBottom: 10 }} rounded>
                    <Icon style={{ color: "#fff" }} name="lock" />
                    <Input
                      style={{ color: "#fff" }}
                      placeholder="Please Enter Password"
                      placeholderTextColor="#fff"
                      secureTextEntry={true}
                      onChangeText={text =>
                        this.handleOnChangeText("password", text)
                      }
                    />
                  </Item>
                  {!loggingIn && (
                    <Item style={{ marginBottom: 10 }} rounded>
                      <Icon style={{ color: "#fff" }} name="lock" />
                      <Input
                        style={{ color: "#fff" }}
                        placeholder="Confirm Password"
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={text =>
                          this.handleOnChangeText("confirmPassword", text)
                        }
                      />
                    </Item>
                  )}
                  <Button
                    rounded
                    block
                    success
                    style={{ marginBottom: 10 }}
                    onPress={() => this.handleOnSubmit()}
                  >
                    <Text>{loggingIn ? "Login" : "Sign up"}</Text>
                  </Button>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#f5f5f5",
                      textDecorationLine: "underline"
                    }}
                    onPress={() => {
                      this.setState({ loggingIn: !loggingIn });
                    }}
                  >
                    {loggingIn ? "or register here" : "back to login page"}
                  </Text>
                </Form>
              </View>
            </ImageBackground>
          </Content>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: Dimensions.get("window").height / 6,
    justifyContent: "flex-end",
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 90,
    bottom: 0
  }
});

export default Login;
