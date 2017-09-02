import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'cont--formulario': {
    'paddingTop': [{ 'unit': 'em', 'value': 8 }],
    'paddingBottom': [{ 'unit': 'em', 'value': 2 }],
    'paddingLeft': [{ 'unit': 'em', 'value': 2 }],
    'paddingRight': [{ 'unit': 'em', 'value': 2 }],
    'flex': '0 0 45%'
  },
  'formulario--img': {
    'display': 'flex'
  },
  'imgcuadro': {
    'background': '#E6E4E0',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center'
  },
  'imgcuadro i': {
    'fontSize': [{ 'unit': 'em', 'value': 2.5 }]
  },
  'cuadro--px': {
    'width': [{ 'unit': 'em', 'value': 15 }],
    'height': [{ 'unit': 'em', 'value': 15 }]
  },
  'frm--btm': {
    'borderRadius': '5px',
    'background': '#005522',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'color': 'white',
    'width': [{ 'unit': 'em', 'value': 15 }],
    'height': [{ 'unit': 'em', 'value': 3 }]
  },
  'fromneet': {
    'margin': [{ 'unit': 'em', 'value': 1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'em', 'value': 1 }, { 'unit': 'px', 'value': 0 }]
  },
  'input--register': {
    'display': 'flex'
  },
  'fromneet input--register input': {
    'width': [{ 'unit': 'em', 'value': 13 }],
    'margin': [{ 'unit': 'em', 'value': 0.2 }, { 'unit': 'em', 'value': 0.2 }, { 'unit': 'em', 'value': 0.2 }, { 'unit': 'em', 'value': 0.2 }]
  },
  'form-submit': {
    'display': 'flex',
    'alignContent': 'flex-end',
    'flexDirection': 'column-reverse',
    'alignItems': 'center'
  }
});
