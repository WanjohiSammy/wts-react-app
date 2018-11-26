import React, { Component } from "react";
import { Progress } from "react-sweet-progress";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  Input,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

class Sendsms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      success: 0,
      pending: 0,
      failed: 0,
      progressPercent: 0,
      progressWidth: 1,
      response: [],
      showTextarea: "block",
      showProgress: "none"
    };
  }
  fetchResponse = async (textValue, last_id) => {
    const api_call = await fetch(
      "https://wts.azurewebsites.net/wts/response?last_id=" +
        last_id +
        "&sms=" +
        textValue,
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    );
    const data = await api_call.json();
    this.setState({
      response: JSON.stringify(data.response),
      success: data.last_id,
      progressPercent: Math.round((data.last_id / 206811) * 100 * 10) / 10
    });
    if (this.state.progressPercent == 100) {
      setTimeout(
        (scope => {
          scope.setState({
            showTextarea: "block",
            showProgress: "none"
          });
        })(this),
        4000
      );
    }
    if (data.last_id < 206811) {
      this.fetchResponse(textValue, data.last_id);
    }
  };

  submitSMS = async event => {
    event.preventDefault();
    this.setState({
      progressPercent: 0,
      showTextarea: "none",
      showProgress: "block"
    });

    const textValue = event.target.elements.sms.value;
    let last_id = 0;
    const api_call = await fetch(
      "https://wts.azurewebsites.net/wts/response?last_id=" +
        last_id +
        "&sms=" +
        textValue,
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    );

    const data = await api_call.json();
    this.setState({
      response: JSON.stringify(data.response),
      success: data.last_id,
      progressPercent: Math.round((data.last_id / 206811) * 100 * 10) / 10
    });
    if (this.state.progressPercent == 100) {
      setTimeout(
        (scope => {
          scope.setState({
            showTextarea: "block",
            showProgress: "none"
          });
        })(this),
        4000
      );
    }

    if (data.last_id < 206811) {
      this.fetchResponse(textValue, data.last_id);
    }
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  render() {
    let { showTextarea, showProgress } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value"> Messages Sent </div>
                <div className="text-value "> {this.state.success} </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{
                  height: "50px"
                }}
              />
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value"> Messages Pending </div>
                <div className="text-value"> {this.state.pending} </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{
                  height: "50px"
                }}
              />
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value"> Messages Failed </div>
                <div className="text-value"> {this.state.failed} </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{
                  height: "50px"
                }}
              />
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value"> Account Balance </div>
                <div className="text-value"> KES .400, 000 </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{
                  height: "50px"
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mx-4">
              <CardBody className="p-4" style={{ display: showTextarea }}>
                <Form onSubmit={this.submitSMS}>
                  <h1> Send SMS </h1>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-envelope" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="textarea"
                      placeholder="Enter message to send"
                      name="sms"
                      required
                      style={{
                        height: "70px"
                      }}
                    />
                  </InputGroup>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button type="submit" className="btn-facebook" block>
                          <span> Send SMS </span>
                        </Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button className="btn-twitter" block>
                          <span> Retry Sending Failed SMS </span>
                        </Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </CardBody>
              <CardBody className="p-4" style={{ display: showProgress }}>
                <h1> Send Progress </h1>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend" />
                  <div
                    id="myProgress"
                    style={{
                      height: "70px",
                      width: "100%",
                      backgroundColor: "#ddd",
                      marginLeft: "5px"
                    }}
                  >
                    <Progress
                      percent={this.state.progressPercent}
                      style={{
                        height: "70px",
                        width: "97%"
                      }}
                      theme={{
                        error: {
                          symbol: this.state.progressPercent + "%",
                          trailColor: "pink",
                          color: "red"
                        },
                        default: {
                          symbol: this.state.progressPercent + "%",
                          trailColor: "lightblue",
                          color: "blue"
                        },
                        active: {
                          symbol: this.state.progressPercent + "%",
                          trailColor: "yellow",
                          color: "orange"
                        },
                        success: {
                          symbol: this.state.progressPercent + "%",
                          trailColor: "lime",
                          color: "green"
                        }
                      }}
                    />
                  </div>
                </InputGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Sendsms;
