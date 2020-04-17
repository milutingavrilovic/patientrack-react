import moment from 'moment';
import { Timeline, DataSet } from "vis-timeline/standalone";
import {base_api_url} from "../../../config/config";
import axios from 'axios';

let cloneTimelineItems1 = [],
    cloneTimelineItems3 = [],
    hideItems = [],
    cloneMainGroups = [],
    cloneGroup3 = [],
    pressInterval = 0,
    timeInterval = 50,
    itemDetails,
    currentItemID = 0,
    closeHover = 1;

export default function assignmentTimeline(groups1, groups3, items1,  items3, itemDates) {
  // DOM element where the Timeline will be attached
  cloneTimelineItems1 = [...items1];
  cloneTimelineItems3 = [...items3];
  cloneMainGroups = [...groups1];
  cloneGroup3 = [...groups3];

  const container = document.getElementById("timeline");
  let startDay = moment().startOf("month").startOf("week").isoWeekday(1);



  // Create a DataSet (allows two way data-binding)
  //var items = new vis.DataSet(data.result);

  // create a data set with groups
  let groups = new DataSet();

  groups.add(groups1);
  groups.add(groups3);

  console.log('groups', groups);

  // create a dataset with items
  let items = new DataSet();
  items1.forEach(item => items.add(item));

  let min = new Date(Math.min(...itemDates));
  let max = new Date(Math.max(...itemDates));
  min = moment(min).clone().subtract(1, 'year');
  max = moment(max).clone().add(2, 'year');

  // specify options
  let options = {
    start: startDay.toDate(),
    end: new Date(1000 * 60 * 60 * 24 + (new Date()).valueOf()),
    horizontalScroll: true,
    zoomKey: 'ctrlKey',
    orientation: 'both',
    zoomMin: 3456e5,
    min: min,
    max: max,
    tooltip: {
      followMouse: true,
      overflowMethod: 'cap'
    },
    groupHeightMode: "auto",
		zoomFriction: 60,
		maxHeight: "720px",
		minHeight: "720px",
    /*minHeight: "100%",*/
    verticalScroll: true,
    onInitialDrawComplete: function(){
      setTimeout(checkTimeLineHeight,300);
    }/*,
		timeAxis: {
			scale: 'month'
		},*/

  };
  // create a Timeline
  let timeline = new Timeline(container, items, groups, options);
  let intial = 0;
  function checkTimeLineHeight(){
    //console.log("checkTimeLineHeight");
    let containerTimeLine = document.getElementsByClassName('vis-timeline');
    let mainContainer = document.getElementById('timeline');
    //console.log(containerTimeLine);
    if(containerTimeLine != null && containerTimeLine.length > 0) {
      let timeLineHeight = containerTimeLine[0].style.height;
      let containerHeight = mainContainer.clientHeight;
      containerHeight -= 172;
      //console.log(containerHeight, timeLineHeight);
      if(parseInt(timeLineHeight) < containerHeight){
        timeline.zoomOut( 0.7 );
        setTimeout(checkTimeLineHeight,250);
      } else {
        intial = 1;
      }
    }
  }

  function move (percentage) {
    let range = timeline.getWindow();
    const interval = range.end - range.start;

    timeline.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end:   range.end.valueOf()   - interval * percentage
    });
  }
  let btnZoomIn = document.getElementById('zoomIn');
  btnZoomIn.addEventListener('mouseover', () => {
    btnZoomIn.classList.add('hover');
  });
  btnZoomIn.addEventListener('mouseout', () => {
    btnZoomIn.classList.remove('hover');
    clearInterval(pressInterval);
  });
  btnZoomIn.addEventListener('mousedown', (e) => {
    console.log(e.button);
    if(e.button === 0){
      timeline.zoomIn( 0.2);
      clearInterval(pressInterval);
      pressInterval = setInterval(() => {
        if(btnZoomIn.classList.contains('hover')){
          timeline.zoomIn( 0.2);
        } else {
          clearInterval(pressInterval);
        }
      }, timeInterval);
    }
  });

  btnZoomIn.addEventListener('click', () => {
    clearInterval(pressInterval);
  });

  let btnZoomOut = document.getElementById('zoomOut');
  btnZoomOut.addEventListener('mouseover', () => {
    btnZoomOut.classList.add('hover');
  });
  btnZoomOut.addEventListener('mouseout', () => {
    btnZoomOut.classList.remove('hover');
    clearInterval(pressInterval);
  });
  btnZoomOut.addEventListener('mousedown', (e) => {
    console.log(e.button);
    if(e.button === 0){
      timeline.zoomOut( 0.2 );
      clearInterval(pressInterval);
      pressInterval = setInterval(() => {
        if(btnZoomOut.classList.contains('hover')){
          timeline.zoomOut( 0.2 );
        }
      }, timeInterval);
    } else {
      clearInterval(pressInterval);
    }
  });
  btnZoomOut.addEventListener('click', () => {
    clearInterval(pressInterval);
  });

  // timeline.on('itemover', function (properties) {
  //   const getItem = items.get(properties.item);
  //   console.log('itemover',properties, getItem);
  //   closeHover = 1;
  //   callData(getItem, 0);
  // });
  //
  // timeline.on('itemout', function (properties) {
  //   const getItem = items.get(properties.item);
  //   console.log('itemout',properties, getItem);
  //   disableIllustration(getItem);
  // });

  timeline.on('click', function (properties) {
    ( async () => {
      //console.log(properties.event.toElement.className);
      //let groupName = properties.event.toElement.innerText;
      let group = groups.get(properties.group), groupName = group.content;
      console.log(properties);
      console.log(properties.group);
      console.log(groupName);
      console.log(group);
      
      if(properties.event.toElement.className.indexOf('expanded') >= 0){
        /*enable parent group items*/
        console.log("Expand");
        if(group.nestedGroups.length > 0){
          await group.nestedGroups.forEach( async grp => {
            await items.forEach( item => {
              if(item.group === grp){
                items.remove(item.id);
              }
            });
          });
        }

        let getItemList = [];
        if(cloneTimelineItems3.length > 0){
          getItemList = await cloneTimelineItems3.map(item => item.group === group.id ? item: undefined).filter(x => x);
          //console.log('3',getItemList,group.id,cloneTimelineItems3);
          if(getItemList !== undefined && getItemList.length > 0 ) {
            try{
              await getItemList.forEach( item => items.add(item));
            }catch(e){
            }
            //console.log("Added level 3 from 3");
          }
          getItemList.length = 0;
        }
        if(cloneTimelineItems1.length > 0){
          getItemList = await cloneTimelineItems1.map(item => item.group === group.id ? item: undefined).filter(x => x);
          //console.log('1',getItemList,group.id,cloneTimelineItems1);
          if(getItemList !== undefined && getItemList.length > 0 ) {
            try{
              await getItemList.forEach( item => items.add(item));
            }catch(e){
            }
            //console.log("Added level 1 from 1");
          }
          getItemList.length = 0;
        }
        if(hideItems.includes(group.id)){
          const filteredItems = await hideItems.filter(item => item !== group.id);
          hideItems = filteredItems;
        }

      } else if(properties.event.toElement.className.indexOf('collapsed') >= 0){
        console.log("collapse");
        /*hide parent group items*/
        await hideItems.push(group.id);
        await items.forEach( item => {
          if(item.group === group.id){
            items.remove(item.id);
          }
        });
        if(cloneTimelineItems3.length > 0 && group.nestedGroups.length > 0){
          group.nestedGroups.forEach( async grp => {
            let getItemList = await  cloneTimelineItems3.map(item => item.group === grp ? item: undefined).filter(x => x);
            if(getItemList !== undefined && getItemList.length > 0 ) {
              try{
                await  getItemList.forEach( item => items.add(item));
              } catch(e){
              }
              //console.log("Added level 3 from 3");
            }
            getItemList.length = 0;
          });
        }
      }
    })();
  });
  timeline.on('select', function (properties) {
    const getItem = items.get(properties.items);
    closeHover = 1;
    disableIllustration(getItem[0]);
    callData(getItem[0], 1);
    closeHover = 0;
    callData(getItem[0], 0);
  });
}

function callData(item, t) {
  console.log('callData:', item, t);
  let token = localStorage.getItem("token");
  if(item !== undefined && item.rf_id !== undefined && currentItemID !== item.rf_id){
    (async () => {
      axios.get(`${base_api_url}/assignment_details/`+item.rf_id, {
        headers: {'x-access-token': token}
      }).then(res => {
        itemDetails = res.data;
        currentItemID = item.rf_id;
        t === 0 ? callIllustration(): showDetails();
      });
    })();
  } else {
    t === 0 ? callIllustration(): showDetails();
  }
}

function disableIllustration(item) {
  document.getElementById('illustration_modal').classList.remove('show');
  if(item !== undefined && typeof item.rf_id !== 'undefined' && currentItemID === item.rf_id){
    currentItemID = 0;
    let element = document.getElementById('illustration_modal');
    if(element.classList.contains('illustration_'+item.rf_id) && closeHover === 1){
      element.classList.remove('show');
      element.classList.remove('illustration_'+item.rf_id);
      element.classList.add('hide');
    }
  } else {
    let element = document.getElementById('illustration_modal');
    if(element.classList.contains('show')){
      element.classList.remove('show');
      element.classList.add('hide');
    }
  }
}

function callIllustration() {
  console.log("callIllustration");
  document.getElementById('illustration_container').classList.remove("d-none");
  let element = document.getElementById('illustration_modal');
  element.classList.remove('hide');
  element.classList.add('show');
  console.log('illustration_'+currentItemID);

  element.classList.add('illustration_'+currentItemID);
  let boxes = [], connections = [], execDate = '', execDate1 = '', fakeDate = '';
  if(itemDetails !== undefined && itemDetails.assignor.length > 0) {
    itemDetails.assignor.forEach( (assignor, index) => {
      let boxName = assignor.normalize_name;
      let assignorID = assignor.id;
      if( boxName  === '' || boxName == null) {
        boxName = assignor.or_name;
      }

      if(index === 0){
        execDate = moment(new Date(assignor.exec_dt)).format('MMM DD, YYYY');
        fakeDate = moment(new Date(assignor.exec_dt)).subtract(9, 'days');
      }
      let boxObj = {
        id: assignorID.toString(),
        name: boxName,
        execution_date: fakeDate.format('MMM DD, YYYY'),
        recorded_date: moment(new Date(itemDetails.assignment.record_dt)).format('MMM DD, YYYY'),
        document: "https://patentrack.com/resources/shared/data/assignment-pat-" + itemDetails.assignment.reel_no + "-" + itemDetails.assignment.frame_no +".pdf",
      }

      let type = "Ownership";
      let boxType = 0;
      let segment = 1;
      let inventorDetails, checkType = "";
      if(itemDetails.assignment.employer_assign === 1){
        boxType = 0;
        segment = 0;
        type = 'Inventor';
        checkType = 'Inventor';
      } else {
        checkType = "Ownership";
        type = "Ownership";
        segment = 1;
      }

      inventorDetails = itemDetails.box.filter( x => x.type === type ? x : '');
      if(inventorDetails !== ''){
        boxObj.type = type;
        boxObj.boxType = inventorDetails[0].id;
        boxObj.shape = inventorDetails[0].shape;
        boxObj.dimension = inventorDetails[0].dimension;
        boxObj.border_color = inventorDetails[0].border_color;
        boxObj.border_linepx = inventorDetails[0].border_px;
        boxObj.background_color = inventorDetails[0].background_color;
        boxObj.segment = segment.toString();
      }

      boxes.push(boxObj);

      if(itemDetails.assignee.length > 0){

        if(itemDetails.assignment.convey_ty === "security"){
          checkType = "Security";
          type = "Security";
          segment = 2;
        } else if(itemDetails.assignment.convey_ty === "release"){
          checkType = "Security";
          type = "Release";
          segment = 2;
        } else if(itemDetails.assignment.convey_ty === "namechg"){
          checkType = "Ownership";
          type = "Name Change";
          segment = 1;
        } else if(itemDetails.assignment.convey_ty === "assignment"){
          checkType = "Ownership";
          type = "Ownership";
          segment = 1;
        } else if(itemDetails.assignment.convey_ty === "correct"){
          checkType = "Ownership";
          type = "Ownership";
          segment = 1;
        }

        itemDetails.assignee.forEach( assignee => {

          if( index === 0) {
            boxName = assignee.normalize_name;


            if( boxName  === '' || boxName == null) {
              boxName = assignee.ee_name;
            }


            boxObj = {
              id: assignee.id.toString(),
              name: boxName,
              execution_date: execDate,
              recorded_date: moment(new Date(itemDetails.assignment.record_dt)).format('MMM DD, YYYY'),
              document: "https://patentrack.com/resources/shared/data/assignment-pat-" + itemDetails.assignment.reel_no + "-" + itemDetails.assignment.frame_no +".pdf",
            }

            inventorDetails = itemDetails.box.filter( x => x.type === checkType ? x : '');
            if(inventorDetails !== ''){
              boxObj.type = type;
              boxObj.boxType = inventorDetails[0].id;
              boxObj.shape = inventorDetails[0].shape;
              boxObj.dimension = inventorDetails[0].dimension;
              boxObj.border_color = inventorDetails[0].border_color;
              boxObj.border_linepx = inventorDetails[0].border_px;
              boxObj.background_color = inventorDetails[0].background_color;
              boxObj.segment = segment.toString();
            }
            boxes.push(boxObj);
          }
          //boxes[boxes.length] = boxObj

          let connectionLine = itemDetails.line.filter( x => x.tooltip === type ? x : '');
          if(connectionLine !== '') {
            let lineType = "Solid";
            if(connectionLine[0].line_type === 1){
              lineType = "Dashed";
            }
            let commentObj = {};
            commentObj[itemDetails.assignment.reel_no + "-" +  itemDetails.assignment.frame_no] = ["",""];
            connections.push({"id":assignee.id,"assignment_no1":1,"color":connectionLine[0].color,"type":type,"type_line":lineType,"ref_id":assignee.rf_id,"start_id":assignorID,"end_id":assignee.id,"box_creator_id":0,"box_creator_id2":0,"popup":[itemDetails.assignment.reel_no + "-" +  itemDetails.assignment.frame_no],"comment":[commentObj],"user_files":[""],"tooltip":connectionLine[0].tooltip,"date":execDate,"document1":"https://patentrack.com/resources/shared/data/assignment-pat-"+itemDetails.assignment.reel_no + "-" +  itemDetails.assignment.frame_no+".pdf","document2":"","note1":"","pdf1":"","note2":"","pdf2":"","popuptop":itemDetails.assignment.reel_no + "-" +  itemDetails.assignment.frame_no,"popupbottom":""});
          }
        });
      }
    });
    let illustrationData = {box: boxes, connection: connections, line: connections, all_boxes: itemDetails.box, legend: itemDetails.line, box_menu: { border_color:["#e8665d","#e8a41c","#c1ed0e","#ed0e2f"], background_color:["#fae3e3","#f5f5d7","#d7f0f5","#f5d7dc"]}, general:{patent_number:"",logo_1:"",logo_2:"",copyright:""},popup:[],comment:""};
    
    loadIllustrationIframeData(illustrationData, fakeDate );
  }
}

function loadIllustrationIframeData(illustrationData, fakeDate) {
	let iframe = document.getElementById('load_illustration_frame');
	if(typeof iframe.contentWindow != 'undefined' && iframe.contentWindow != null && typeof iframe.contentWindow.renderData == "function"){
		const element = iframe.contentDocument;	
		if(element != null) {
			const container = element.querySelector("#container");
			container.innerHTML = '';
			iframe.contentWindow.renderData(illustrationData);
			const menuItem = element.querySelector('.menu');
			if(menuItem != null ){
				menuItem.remove();
				iframe.contentWindow.removeFakeDates(fakeDate.format('DD MMM YYYY'),fakeDate.format('YYYY-MM-DD'));
				const svg = container.querySelector('svg');
				let widthSvg = svg.getAttribute('width');
				let heightSvg = svg.getAttribute('height');
				widthSvg = parseInt(widthSvg) + 30;
				heightSvg = parseInt(heightSvg) + 30;
				iframe.style.width = 500;
				iframe.style.height = 400;
			}
		}
	} else {
		setTimeout(() => {
			loadIllustrationIframeData(illustrationData, fakeDate)
		}, 300);
	}
}

function showDetails() {
  console.log("showDetails");
  document.getElementById('comment_container').classList.remove("d-none");
  //document.getElementById('assignment_container').classList.remove("d-none");
  document.getElementById('illustration_container').classList.remove("d-none");


  //console.log(properties, getItem);
  console.log('itemDetails', itemDetails);
  if(itemDetails !== undefined && itemDetails !== "" && itemDetails.hasOwnProperty('assignee')){
    let assignors = [], assignees = [], correspondenceString = "";
    if(itemDetails.assignor.length > 0){
      itemDetails.assignor.forEach( assignor => {
        let name = assignor.normalize_name;
        if( name === '' || name == null){
          name = assignor.or_name;
        }
        assignors.push(name);
      });
    }
    if(itemDetails.assignee.length > 0){
      itemDetails.assignee.forEach( assignee => {
        let name = assignee.normalize_name;
        if( name === '' || name == null){
          name = assignee.ee_name;
        }
        let assigneeString = name;
        if(assignee.ee_address_1 != ''){
          assigneeString += '<br/>'+assignee.ee_address_1;
        }
        if(assignee.ee_address_2 != ''){
          assigneeString += '<br/>'+assignee.ee_address_2;
        }
        if(assignee.ee_city != ''){
          assigneeString += '<br/>'+assignee.ee_city+" "+ assignee.ee_postcode;
        } else {
          assigneeString += '<br/>'+assignee.ee_state+" "+ assignee.ee_postcode;
        }

        assignees.push(assigneeString);
      });
    }
    correspondenceString = itemDetails.assignment.cname;
    if(itemDetails.assignment.caddress_1 !== ''){
      correspondenceString += '<br/>'+itemDetails.assignment.caddress_1;
    }
    if(itemDetails.assignment.caddress_2 !== ''){
      correspondenceString += '<br/>'+itemDetails.assignment.caddress_2;
    }
    if(itemDetails.assignment.caddress_3 !== ''){
      correspondenceString += '<br/>'+itemDetails.assignment.caddress_3;
    }
    if(itemDetails.assignment.caddress_4 !== ''){
      correspondenceString += '<br/>'+itemDetails.assignment.caddress_4;
    }
    let html = `<div class="title">${(itemDetails.assignment.convey_text)}<span class="close" onClick="javascript: var element = document.getElementById('illustration_modal');
  element.classList.remove('show');">&times;</span></div><div class="p-1"><table class="top"><tbody><tr><td>Execution Date<br>${itemDetails.assignor.length ? moment(new Date(itemDetails.assignor[0].exec_dt)).format('DD MMM YYYY') : ''}</td><td>Reel/frame<br>${itemDetails.assignment.reel_no}-${itemDetails.assignment.frame_no}</td></tr><tr><td>Assignors<br>${(assignors.join('<br/>'))}</td><td>Date Recorded<br>${moment(itemDetails.assignment.record_dt).format('DD MMM YYYY')}</td></tr><tr><td>Assignee<br>${(assignees.join('<br/>'))}</td><td>${(correspondenceString)}</td></tr></tbody></table></div>`;
    document.getElementById('assignment_details').innerHTML = html;
  }
}