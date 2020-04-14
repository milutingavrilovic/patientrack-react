import moment from 'moment';
import assignmentTimeline from './TimeLine1';

const modifyingData = (result) => {
  let merger = [],
    mergerOut = [],
    employee = [],
    purchase = [],
    invented = [],
    assignment = [],
    sale = [],
    security = [],
    release = [],
    govern = [],
    correct = [],
    missing = [],
    other = [],
    namechg = [],
    items1 = [],
    items2 = [],
    items3 = [],
    groups3= [],
    groups= [],
    groupID = 0,
    rfID = 0,
    itemDates = [],
    itemIncrement = 1,
    mainGroup = "";

  if(result.assignment_assignors.length > 0){
    for(let i = 0; i < result.assignment_assignors.length; i++) {
      let name = result.assignment_assignors[i].normalize_name;

      if( name === '' || name === null) {
        name = result.assignment_assignors[i].raw_name;
      }
      groupID = "";
      switch(result.assignment_assignors[i].convey_ty){
        case 'assignment':

          if(result.assignment_assignors[i].employer_assign === 1){
            groupID = "invented";
            if(!invented.includes( name )){
              invented.push( name );
            }
          } else {
            groupID = "purchased";
            if(!purchase.includes( name ) ) {
              purchase.push( name );
            }
          }
          /*
          if( !assignment.includes( name ) ){
            assignment.push( name );
            groupID = "assignment";
          }*/
          break;
        case 'correct':
          if( !correct.includes( name ) ){
            correct.push( name );
          }
          groupID = "correct";
          break;
        case 'employee':
          if( !employee.includes( name ) ){
            employee.push( name );
          }
          groupID = "employee";
          break;
        case 'govern':
          if( !govern.includes( name ) ){
            govern.push( name );
          }
          groupID = "govern";
          break;
        case 'merger':
          if( !merger.includes( name ) ){
            merger.push( name );
          }
          groupID = "merger";
          break;
        case 'missing':
          if( !missing.includes( name ) ){
            missing.push( name );
          }
          groupID = "missing";
          break;
        case 'namechg':
          if( !namechg.includes( name ) ){
            namechg.push( name );
          }
          groupID = "namechg";
          break;
        case 'other':
          if( !other.includes( name ) ){
            other.push( name );
          }
          groupID = "other";
          break;
      }
      //console.log(new Date(result.assignment_assignors[i].exec_dt), result.assignment_assignors[i].exec_dt);
      let start = moment(new Date(result.assignment_assignors[i].exec_dt));
      let end = start.clone().add(24, 'hours');
      let startFormatDate = start.format('MMM DD, YYYY');
      let content = [];
      /**List of Assignors for particular transactions */
      if(result.assignors.length > 0){
        for(let j =0; j < result.assignors.length; j++){
          if( result.assignors[j].rf_id === result.assignment_assignors[i].rf_id ){
            let assignorName = result.assignors[j].normalize_name;

            if( assignorName === '' || assignorName === null) {
              assignorName = result.assignors[j].raw_name;
            }
            content.push(assignorName);
          }
        }
      }

      if(result.assignment_assignors[i].rf_id > rfID){
        rfID = result.assignment_assignors[i].rf_id;
      }
      if(content.length > 0){
        //console.log(start);
        itemDates.push(start.valueOf());
        /**Add items to group level 2 */
        items2.push({
          id: itemIncrement,
          group: groupID,
          content:  content[0],
          title: "<p>Date: "+startFormatDate+"<br/>"+  content.join('<br/>')  +"</p>",
          trans_id: result.assignment_assignors[i].id,
          rf_id: result.assignment_assignors[i].rf_id,
          start: start,
          end: end,
          type: 'point'
        });
        itemIncrement++;
        /**Add items to Group Level 3 */
        if(groupID != 'invented') {
          //console.log("GG",groupID, name);
          items3.push({
            id: itemIncrement,
            group: name,
            content: name ,
            title: "<p>Date: "+startFormatDate+"<br/>"+  content.join('<br/>')  +"</p>",
            trans_id: result.assignment_assignors[i].id,
            rf_id: result.assignment_assignors[i].rf_id,
            start: start,
            end: end,
            type: 'point'
          });
          itemIncrement++;
        }
        /**Add items to Group Level 1 */
        if(groupID === "release" || groupID === "security"){
          mainGroup = "main_security";
        } else if(groupID === "purchased" || groupID === "invented" || groupID === "merger" || groupID === "employee") {
          mainGroup = "main_ownership";
        } else if(groupID === "other" || groupID === "namechg" || groupID === "govern" || groupID === "missing" || groupID === "correct") {
          mainGroup = "main_other";
        }
        if(mainGroup != "") {
          items1.push({
            id: itemIncrement,
            group: mainGroup,
            content:  content[0] ,
            title: "<p>Date: "+startFormatDate+"<br/>"+  content.join('<br/>')  +"</p>",
            trans_id: result.assignment_assignors[i].id,
            rf_id: result.assignment_assignors[i].rf_id,
            start: start,
            end: end,
            type: 'point'
          });
          itemIncrement++;
        }
      }
    }
  }

  if(result.assignment_assignee.length > 0) {
    mainGroup = "";
    groupID = "";
    itemIncrement++;
    for(let i = 0; i < result.assignment_assignee.length; i++) {
      let name = result.assignment_assignee[i].normalize_name;

      if( name === '' || name === null) {
        name = result.assignment_assignee[i].raw_name;
      }

      switch(result.assignment_assignee[i].convey_ty){
        case 'release':
          if( !release.includes( name ) ){
            release.push( name );
          }
          groupID = "release";
          break;
        case 'security':
          if( !security.includes( name ) ){
            security.push( name );
          }
          groupID = "security";
          break;
        case 'merger':
          if( !mergerOut.includes( name ) ){
            mergerOut.push( name );
          }
          groupID = "mergerout";
          break;
        default:
          if( !sale.includes( name ) ){
            sale.push( name );
          }
          groupID = "sale";
          break;
      }

      let start = moment(new Date(result.assignment_assignee[i].exec_dt));
      let end = start.clone().add(24, 'hours');
      let startFormatDate = start.format('MMM DD, YYYY');
      let content = [];

      if(result.assignees.length > 0){
        for(let j =0; j < result.assignees.length; j++){
          if( result.assignees[j].rf_id === result.assignment_assignee[i].rf_id ){
            let assigneeName = result.assignees[j].normalize_name;

            if( assigneeName === '' || assigneeName === null) {
              assigneeName = result.assignees[j].raw_name;
            }
            content.push(assigneeName);
          }
        }
      }

      if(result.assignment_assignee[i].rf_id > rfID){
        rfID = result.assignment_assignee[i].rf_id;
      }
      if(content.length > 0){
        itemDates.push(start.valueOf());
        /**Add items to group level 2 */
        items2.push({
          id: itemIncrement,
          trans_id: result.assignment_assignee[i].id,
          rf_id: result.assignment_assignee[i].rf_id,
          group: groupID,
          content:  content[0] ,
          title: "<p>Date: "+startFormatDate+"<br/>"+  content.join('<br/>') +"</p>",
          start: start,
          end: end,
          type: 'point'
        })
        itemIncrement++;
        /**Add items to Group Level 3 */
        items3.push({
          id: itemIncrement,
          trans_id: result.assignment_assignee[i].id,
          rf_id: result.assignment_assignee[i].rf_id,
          group: name,
          content: content[0] ,
          title: "<p>Date: "+startFormatDate+"<br/>"+  content.join('<br/>') +"</p>",
          start: start,
          end: end,
          type: 'point'
        })
        itemIncrement++;

        /**Add items to Group Level 1 */
        if(groupID === "release" || groupID === "security"){
          mainGroup = "main_security";
        } else if(groupID === "purchased" || groupID === "invented" || groupID === "merger" || groupID === "employee" || groupID === "mergerout" || groupID === "sale") {
          mainGroup = "main_ownership";
        } else if(groupID === "other" || groupID === "namechg" || groupID === "govern" || groupID === "missing" || groupID === "correct") {
          mainGroup = "main_other";
        }
        if(mainGroup != "") {
          items1.push({
            id: itemIncrement,
            group: mainGroup,
            content: content[0],
            title: "<p>Date: "+startFormatDate+"<br/>"+  content.join('<br/>')+"</p>",
            trans_id: result.assignment_assignee[i].id,
            rf_id: result.assignment_assignee[i].rf_id,
            start: start,
            end: end,
            type: 'point'
          });
          itemIncrement++;
        }
      }
    }
  }
  rfID += 1;
  let group1 = rfID, group2 = rfID + 2, group3 = rfID + 3;

  rfID += 4;
  /**Create Group level 1 */
  groups.push(
    {
      id: group1,
      title: "Ownership",
      content: "Ownership",
      treeLevel: 1,
      showNested: false,
      nestedGroups: []
    },
    {
      id: group2,
      title: "Security",
      content: "Security",
      treeLevel: 1,
      showNested: false,
      nestedGroups: []
    },
    {
      id: group3,
      title: "Other",
      content: "Other",
      treeLevel: 1,
      showNested: false,
      nestedGroups: []
    }
  );




  let mergerID = 0, mergerOutID = 0, employeeID = 0, purchaseID = 0, inventedID = 0, assignmentID = 0, saleID = 0, securityID = 0, releaseID = 0, governID = 0, correctID = 0, missingID = 0, namechgID = 0, otherID = 0;
  /**Merger In */
  rfID += 1;
  if(merger.length > 0){
    let mergerNestedGroup = [];
    merger.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      mergerNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    mergerID = rfID;
    groups.push({
      id: mergerID,
      content: "Merger In",
      treeLevel: 2,
      showNested: false,
      nestedGroups: mergerNestedGroup
    });
    groups[0].nestedGroups.push(mergerID);
  }
  /**Merger Out */
  rfID += 1;
  if(mergerOut.length > 0){
    let mergerOutNestedGroup = [];
    mergerOut.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      mergerOutNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    mergerOutID = rfID;
    groups.push({
      id: mergerOutID,
      content: "Merger Out",
      treeLevel: 2,
      showNested: false,
      nestedGroups: mergerOutNestedGroup
    });
    groups[0].nestedGroups.push(mergerOutID);
  }

  /**Employee */
  rfID += 1;
  if(employee.length > 0){
    let employeeNestedGroup = [];
    employee.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      employeeNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    employeeID = rfID;
    groups.push({
      id: employeeID,
      content: "Employee",
      treeLevel: 2,
      showNested: false,
      nestedGroups: employeeNestedGroup
    });
    groups[0].nestedGroups.push(employeeID);
  }

  /**Purchased */
//console.log(purchase);
  rfID += 1;
  if(purchase.length > 0){
    let purchaseNestedGroup = [];
    purchase.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      purchaseNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    purchaseID = rfID;
    groups.push({
      id: purchaseID,
      content: "Purchased",
      treeLevel: 2,
      showNested: false,
      nestedGroups: purchaseNestedGroup
    })
    groups[0].nestedGroups.push(purchaseID);
  }

  /**Invented */
//console.log("INVENTED",invented);
  rfID += 1;
  if(invented.length > 0){
    let inventedNestedGroup = [];
    /*invented.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      inventedNestedGroup.push(rfID);
      rfID += 1;
    });*/

    rfID += 1;
    inventedID = rfID;
    groups.push({
      id: inventedID,
      content: "Invented",
      treeLevel: 2,
      /*showNested: false,
      nestedGroups: inventedNestedGroup*/
    })
    groups[0].nestedGroups.push(inventedID);
  }

  /**Sale */

  rfID += 1;
  if(sale.length > 0){
    let saleNestedGroup = [];
    sale.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      saleNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    saleID = rfID;
    groups.push({
      id: saleID,
      content: "Sale",
      treeLevel: 2,
      showNested: false,
      nestedGroups: saleNestedGroup
    })
    groups[0].nestedGroups.push(saleID);
  }

  /** Security */
  rfID += 1;
  if(security.length > 0){
    let securityNestedGroup = [];
    security.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      securityNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    securityID = rfID;
    groups.push({
      id: securityID,
      content: "Security",
      treeLevel: 2,
      showNested: false,
      nestedGroups: securityNestedGroup
    })
    groups[1].nestedGroups.push(securityID);
  }

  /**Release */
  rfID += 1;
  if(release.length > 0){
    let releaseNestedGroup = [];
    release.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      releaseNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    releaseID = rfID;
    groups.push({
      id: releaseID,
      content: "Release",
      treeLevel: 2,
      showNested: false,
      nestedGroups: releaseNestedGroup
    })
    groups[1].nestedGroups.push(releaseID);
  }

  /***Govern */
  rfID += 1;
  if(govern.length > 0){
    let governNestedGroup = [];
    govern.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      governNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    governID = rfID;
    groups.push({
      id: governID,
      content: "Govern",
      treeLevel: 2,
      showNested: false,
      nestedGroups: governNestedGroup
    })
    groups[2].nestedGroups.push(governID);
  }
  /**Correct */
  rfID += 1;
  /*if(correct.length > 0){
    let correctNestedGroup = [];
    correct.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      correctNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    correctID = rfID;
    groups.push({
      id: correctID,
      content: "Correct",
      treeLevel: 2,
      showNested: false,
      nestedGroups: correctNestedGroup
    })
    groups[2].nestedGroups.push(correctID);
  }*/

  /***Missing */

  rfID += 1;
  if(missing.length > 0){
    let missingNestedGroup = [];
    missing.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      missingNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    missingID = rfID;
    groups.push({
      id: missingID,
      content: "Missing",
      treeLevel: 2,
      showNested: false,
      nestedGroups: missingNestedGroup
    })
    groups[2].nestedGroups.push(missingID);
  }

  /***Other */

  rfID += 1;
  if(other.length > 0){
    let otherNestedGroup = [];
    other.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      otherNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    otherID = rfID;
    groups.push({
      id: otherID,
      content: "Missing",
      treeLevel: 2,
      showNested: false,
      nestedGroups: otherNestedGroup
    })
    groups[2].nestedGroups.push(otherID);
  }

  /**Name change */
  rfID += 1;
  if(namechg.length > 0){
    let namechgNestedGroup = [];
    namechg.forEach( item => {
      groups3.push({
        id: rfID,
        treeLevel: 3,
        content: item
      });
      namechgNestedGroup.push(rfID);
      rfID += 1;
    });

    rfID += 1;
    namechgID = rfID;
    groups.push({
      id: namechgID,
      content: "Name Change",
      treeLevel: 2,
      showNested: false,
      nestedGroups: namechgNestedGroup
    })
    groups[2].nestedGroups.push(namechgID);
  }

  /** Updating Group ID */
//console.log("Items Before Updating",...items3);
  (async () => {
    await items1.forEach( async ( item, index) => {
      let groupID = 0;
      switch(item.group){
        case 'main_security':
          groupID = group2;
          break;
        case 'main_ownership':
          groupID = group1;
          break;
        case 'main_other':
          groupID = group3;
          break;
      }
      items1[index].group = groupID;
    });

    //await console.log("Items Before Update",...items2);
    for(let j = 0; j < items2.length; j++) {
      let groupID = 0;
      switch(items2[j].group){
        case 'purchased':
          groupID = purchaseID;
          break;
        case 'invented':
          groupID = inventedID;
          break;
        case 'correct':
          groupID = correctID;
          break;
        case 'employee':
          groupID = employeeID;
          break;
        case 'govern':
          groupID = governID;
          break;
        case 'merger':
          groupID = mergerID;
          break;
        case 'mergerout':
          groupID = mergerOutID;
          break;
        case 'missing':
          groupID = missingID;
          break;
        case 'namechg':
          groupID = namechgID;
          break;
        case 'other':
          groupID = otherID;
          break;
        case 'release':
          groupID = releaseID;
          break;
        case 'security':
          groupID = securityID;
          break;
        case 'sale':
          groupID = saleID;
          break;
      }
      //console.log("ITEM@",groupID);
      if(groupID > 0){
        items2[j].group = groupID;
      } else {
        //console.log("ITEM@",groupID, items2[j].group);
      }
    }
    //console.log("PURCHASED",purchaseID);
    //await console.log("Items After Update",...items2);

    if(groups3.length > 0){
      //console.log("Items3 Before Update",...groups3);
      /*console.log("Items Before Update",...items3);*/
      for(let k = 0 ; k < groups3.length; k++) {
        for(let l = 0; l < items3.length; l++) {
          if(items3[l].group === groups3[k].content) {
            items3[l].group = groups3[k].id;
          }
        }
      }
      //console.log("Items3 After Update",...items3);
      /*await groups3.forEach( grpItem => {
        var objGroupindex = items3.map((e,i) => e.group === grpItem.content ? i : undefined).filter(x => x);
        if(objGroupindex.length > 0){
          objGroupindex.forEach( i => {
            items3[i].group = grpItem.id;
          });
        }
      });*/
    }

  })();
  if(groups3.length > 0){
    groups3.forEach( grpItem => {
      var objGroupindex = items3.map((e,i) => e.group === grpItem.content ? i : undefined).filter(x => x);
      if(objGroupindex.length > 0){
        objGroupindex.forEach( i => {
          items3[i].group = grpItem.id;
        });
      }
    });
  }

  console.log(groups, groups3,  rfID, items1, items2, items3, itemDates);
  return {
    groups,
    groups3,
    items1,
    items2,
    items3,
    itemDates
  }
};

export default modifyingData;