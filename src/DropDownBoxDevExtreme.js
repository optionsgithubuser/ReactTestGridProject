import React,{Component} from "react";
import data from "./data";
import DataGrid, {Column, Scrolling, Selection,} from "devextreme-react/data-grid";
import {Button, Modal} from "antd";
import { DropDownBox } from 'devextreme-react';
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import 'antd/dist/antd.css';

class DropDownBoxDevExtreme extends Component{

    state = {
        visible: false,
        details: data,

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    onSelectionChanged = (record) => {
        this.setState({
            SupplierBidName: record.selectedRowsData[0].SupplierBidName
        })
    }

    render() {
        const { details, SupplierBidName} = this.state;
        return(
            <div>
                <Button type="primary" style={{marginTop: "50px"}} onClick={this.showModal}>
                    Open DropDown Box DevExtreme
                </Button>
                <Modal
                    title=" DropDown Box DevExtreme"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <DropDownBox
                        value={SupplierBidName}
                        valueExpr={'FKey_OP_Supplier_Bid'}
                        deferRendering={false}
                        displayExpr={(item) => item && `${item.Name }`}
                        placeholder={'Select a value...'}
                        dataSource={details}
                        defaultOpened={false}
                        contentRender={(record)=>{
                            return (
                                <DataGrid
                                    refCallback={(dg) => this.dg = dg}
                                    dataSource={details}
                                    hoverStateEnabled={true}
                                    onSelectionChanged={(record) => this.onSelectionChanged(record)}
                                    height={'100%'}>
                                    <Selection mode={'single'} />
                                    <Scrolling mode={'infinite'} />
                                    <Column sortOrder={'asc'} caption={'Supplier Bid Name'} dataField={'SupplierBidName'}/>
                                    <Column caption={'Supplier Name'} dataField={'SupplierName'}/>
                                </DataGrid>
                            )
                        }}
                    />
                </Modal>
            </div>

        )
    }

}

export default DropDownBoxDevExtreme
