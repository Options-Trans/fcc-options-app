var React = require('react');
var connect = require('react-redux').connect;

var VehiclePanel = React.createClass({
  render : function() {
    return (
      <div className="box box-widget cust-height">
        <div className="box-header with-border">
          <h3 className="box-title">Vehicles</h3>
          <div className="pull-right">
            <div className="btn-group">
              <button
                className="btn btn-default"
                title='Get Optimal Route'
              >
                <i className="fa fa-cogs"></i>
              </button>
              <button
                className="btn btn-default"
                title='Discard Changes'
              >
                <i className="fa fa-trash-o"></i>
              </button>
              <button
                className="btn btn-default"
                title="Save Changes"
              >
                <i className="fa fa-floppy-o"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="box-body">
          {//<div className="box-group" id="vehicle-accrd" role="tablist" aria-multiselectable="true">
          }
          {
            this.props.vehiclesIds.map(function(id, index) {
              var vehicle = this.props.vehicles[id];
              return (
                <div key={index}>{vehicle.name}</div>
              )
            }.bind(this))
          }
          {//</div>
          }
        </div>
      </div>
    )
  }
});

var mapStateToProps = function(state){
  return{
    vehiclesIds: state.vehicles.ids,
    vehicles: state.vehicles.data
  }
}
var mapDispatchToProps = function(dispatch) {
  return {

  }
}

var VehiclePanelContainer = connect(mapStateToProps, mapDispatchToProps)(VehiclePanel);
module.exports = VehiclePanelContainer;
