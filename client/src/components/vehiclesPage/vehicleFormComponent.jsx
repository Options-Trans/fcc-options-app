'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var Message = require('../message.jsx');

var ModelActions = require('../../actions/modelActions.js');
var models = require('../../constants/models.js');
var actions = new ModelActions(models.VEHICLES);

var VehicleForm = React.createClass({
  setVehicleToEdit: function(vehicle) {
    this.setState({vehicle: vehicle});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.props.verb == "Add") {
      this.props.onAddVehicle(this.state.vehicle);
    } else if (this.props.verb == "Edit") {
      this.props.onEditVehicle(this.state.vehicle);
    }
  },
  handleNameChange: function(e) {
    var vehicleState = Object.assign({}, this.state.vehicle, {name: e.target.value})
    this.setState({vehicle: vehicleState});
  },
  handleFixedSeatsChange: function(e) {
    var vehicleState = Object.assign({}, this.state.vehicle, {seats: e.target.value})
    this.setState({vehicle: vehicleState});
  },
  handleFoldableSeatsChange: function(e) {
    var vehicleState = Object.assign({}, this.state.vehicle, {flexSeats: e.target.value})
    this.setState({vehicle: vehicleState});
  },
  handleWheelchairCapacityChange: function(e) {
    var vehicleState = Object.assign({}, this.state.vehicle, {wheelchairs: e.target.value})
    this.setState({vehicle: vehicleState});
  },
  getInitialState: function() {
    return {vehicle: {}};
  },
  componentDidMount: function() {
    // set vehicle to edit only if there is no request pending
    if (this.props.vehicle && !this.props.isLoading) {
      this.setVehicleToEdit(this.props.vehicle);
    }
  },
  componentWillReceiveProps: function(nextProps) {

    // set vehicle to edit only if there is no request pending
    if (nextProps.vehicle && !nextProps.isLoading) {
      this.setVehicleToEdit(nextProps.vehicle);
    }
  },
  render: function() {
    var boxClass = this.props.verb === "Edit"
      ? "box box-warning"
      : "box box-info";
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className={boxClass}>
            <div className="box-header with-border">
              <h3 className="box-title">{this.props.verb + " a Vehicle"}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" onClick={this.props.onCloseForm} data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            {this.props.message
              ? <Message message={this.props.message}/>
              : null}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="c_name" className="col-sm-2 control-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="c_name" placeholder="Name" value={this.state.vehicle.name} onChange={this.handleNameChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_fixed_seats" className="col-sm-2 control-label">Seats</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_fixed_seats" placeholder="Fixed Seats" value={this.state.vehicle.seats} onChange={this.handleFixedSeatsChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_foldable_seats" className="col-sm-2 control-label">Foldable Seats</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_foldable_seats" placeholder="Foldable Seats" value={this.state.vehicle.flexSeats} onChange={this.handleFoldableSeatsChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c_max_wheelchairs" className="col-sm-2 control-label">Wheelchairs</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="c_max_wheelchairs" placeholder="Wheelchair Capacity" value={this.state.vehicle.wheelchairs} onChange={this.handleWheelchairCapacityChange}/>
                  </div>
                </div>
              </div>
              {this.props.isLoading
                ? <div className="overlay">
                    <i className="fa fa-refresh fa-spin"></i>
                  </div>
                : null}
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">Submit</button>

              </div>

            </form>

          </div>
        </div>
      </div>
    )
  }
});


var mapStateToProps = function(state) {
  //if editing, get vehicle to edit
  var vehicle;
  var editId = state.vehiclesPage.form.editId;
  if (editId) {
    vehicle = state.vehicles.data[editId];
  }
  //Not sure if it's smart to use Object.assign here.  I don't want to map
  //every property in form individually
  return Object.assign({}, state.vehiclesPage.form, {vehicle: vehicle});
}
var mapDispatchToProps = function(dispatch) {
  return {
    onAddVehicle: function(vehicle) {
      dispatch(actions.create(vehicle));
    },
    onEditVehicle: function(vehicle) {
      dispatch(actions.update(vehicle));
    },
    onCloseForm: function() {
      dispatch(actions.closeForm());
    }

  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(VehicleForm);
