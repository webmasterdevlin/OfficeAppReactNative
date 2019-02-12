import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  ImageBackground
} from "react-native";
import bg from "./assets/images/officebg.jpeg";
import logo from "./assets/images/company_logo.png";

import {
  Container,
  Header,
  Footer,
  Content,
  View,
  Text,
  List,
  Form,
  Input,
  Item,
  ListItem,
  Button,
  Icon,
  Title,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  SwipeRow
} from "native-base";

class TestScreen extends Component {
  state = {
    login: { username: null, password: null },
    signup: {
      username: null,
      email: null,
      password: null,
      repeatPassword: null
    },
    loggingIn: true
  };

  render() {
    const { loggingIn } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <Content scrollEnabled={false}>
            <ImageBackground style={styles.loginBackground} source={bg}>
              <View style={styles.loginForeground}>
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{
                      width: 200,
                      height: 200
                    }}
                    source={logo}
                  />
                </View>
                <Form>
                  <Item style={{ marginBottom: 10 }} rounded>
                    <Icon style={{ color: "#fff" }} name="mail" />
                    <Input
                      style={{ color: "#fff" }}
                      placeholder="Please Enter Email"
                      placeholderTextColor="#fff"
                    />
                  </Item>
                  <Item style={{ marginBottom: 10 }} rounded>
                    <Icon style={{ color: "#fff" }} name="lock" />
                    <Input
                      style={{ color: "#fff" }}
                      placeholder="Please Enter Password"
                      placeholderTextColor="#fff"
                      secureTextEntry={true}
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
                      />
                    </Item>
                  )}
                  <Button
                    rounded
                    block
                    success
                    style={{ marginBottom: 10 }}
                    onPress={() => alert("Logging in...")}
                  >
                    <Text>{loggingIn ? "Login" : "Sign up"}</Text>
                  </Button>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#f5f5f5",
                      textDecorationLine: "underline"
                    }}
                    onPress={() => this.setState({ loggingIn: !loggingIn })}
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
  imageContainer: {
    flex: 1,
    width: "100px",
    height: "100%"
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  loginBackground: {
    flex: 1,
    width: null,
    height: null
  },
  loginForeground: {
    flex: 1,
    marginTop: Dimensions.get("window").height / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 90,
    bottom: 0
  }
});

export default TestScreen;
