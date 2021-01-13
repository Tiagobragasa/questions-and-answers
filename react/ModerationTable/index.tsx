import React, { FC, useState, useContext, Fragment } from 'react'
import { compose, graphql, useLazyQuery } from 'react-apollo'
import { injectIntl } from 'react-intl'
import {
  Table,
  Checkbox,
  IconArrowUp,
  IconArrowDown,
  IconShoppingCart,
  Input,
} from 'vtex.styleguide'

import GET_ALL_QUESTIONS from '../queries/getAllQuestions.gql'
import GET_ALL_ANSWERS from '../queries/getAllAnswers.gql'

const ModerationTable: FC<any> = (data) => {
  const [state, setState] = useState<any>({
    items: null,
    tableDensity: 'low',
    searchValue: null,
    filterStatements: [],
    approved: {}
  })

  const {tableDensity, approved, searchValue, filterStatements} = state

  const [ getAllQuestions, { data: questionsData, called: questionsCalled, }, ] = useLazyQuery(GET_ALL_QUESTIONS)
  const [ getAllAnswers, { data: answersData, called: answersCalled, }, ] = useLazyQuery(GET_ALL_QUESTIONS)

  if (!questionsCalled) {
    getAllQuestions()
  }

  if (!answersCalled) {
    getAllAnswers()
  }

  const items = questionsData?.allQuestions || []

  const questionSchema = {
    properties: {
      question: {
        title: 'Question',
        width: 400,
      },
      name: {
        title: 'Name',
        width: 150,
      },
      email: {
        title: 'Email',
        width: 200,
      },
      approved: {
        title: 'Approved',
        width: 100,
        cellRenderer: (cellData:any) => {
          const question = cellData.rowData
          return (
            <div
              onClick={e => {
                e.stopPropagation()
              }}>
              <Checkbox
                checked={question.allowed}
                id="select-option"
                name="select-option"
                onChange={() => setState({ ...state, approved: !question.allowed })}
              />
            </div>
          )
        },
      }
    },
  }

  console.log("questionsData =>", questionsData)

  return(
    <div>
        Questions
        <Table
          fullWidth
          updateTableKey={tableDensity}
          items={items}
          density="low"
          schema={questionSchema}
        />
      </div>
  )
}

export default injectIntl((ModerationTable))


// schema={getSchema()}

// toolbar={{
//   density: {
//     buttonLabel: 'Line density',
//     lowOptionLabel: 'Low',
//     mediumOptionLabel: 'Medium',
//     highOptionLabel: 'High',
//     handleCallback: (density: string) =>
//       setState({ tableDensity: density }),
//   },
//   inputSearch: {
//     value: searchValue,
//     placeholder: 'Search stuff...',
//     onChange: (value: string) =>
//       setState({ searchValue: value }),
//     onClear: () => setState({ searchValue: null }),
//     onSubmit: () => {},
//   },
//   download: {
//     label: 'Export',
//     handleCallback: () => alert('Callback()'),
//   },
//   upload: {
//     label: 'Import',
//     handleCallback: () => alert('Callback()'),
//   },
//   fields: {
//     label: 'Toggle visible fields',
//     showAllLabel: 'Show All',
//     hideAllLabel: 'Hide All',
//   },
//   extraActions: {
//     label: 'More options',
//     actions: [
//       {
//         label: 'An action',
//         handleCallback: () => alert('An action'),
//       },
//       {
//         label: 'Another action',
//         handleCallback: () => alert('Another action'),
//       },
//       {
//         label: 'A third action',
//         handleCallback: () => alert('A third action'),
//       },
//     ],
//   },
//   newLine: {
//     label: 'New',
//     handleCallback: () => alert('handle new line callback'),
//   },
// }}
// filters={{
//   alwaysVisibleFilters: ['name', 'email'],
//   statements: filterStatements,
//   onChangeStatements: (newStatements: string) =>
//     setState({ filterStatements: newStatements }),
//   clearAllFiltersButtonLabel: 'Clear Filters',
//   collapseLeft: true,
//   options: {
//     name: {
//       label: 'Name',
//       ...simpleInputVerbsAndLabel(),
//     },
//     email: {
//       label: 'Email',
//       ...simpleInputVerbsAndLabel(),
//     },
//   },
// }}
// bulkActions={{
//   texts: {
//     secondaryActionsLabel: 'Actions',
//     rowsSelected: (qty: any) => (
//       <Fragment>Selected rows: {qty}</Fragment>
//     ),
//     selectAll: 'Select all',
//     allRowsSelected: (qty: any) => (
//       <Fragment>All rows selected: {qty}</Fragment>
//     ),
//   },
//   totalItems: 100,
//   main: {
//     label: 'Send email',
//     handleCallback: (params: any) => alert('TODO: SHOW EMAIL FORM'),
//   },
//   others: [
//     {
//       label: 'Reset avatar',
//       handleCallback: (params: any) => console.warn(params),
//     },
//     {
//       label: 'Delete',
//       handleCallback: (params: any) => console.warn(params),
//     },
//   ],
// }}


// export default class UsersTable extends Component {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//       items: MOCKED_DATA,
//       tableDensity: 'low',
//       searchValue: null,
//       filterStatements: [],
//     }
//   }

//   private getQuestions() {
//     const { questionsdata } = useQuery(SEARCH_QUESTIONS);

//     return (data?.questions)
//   }

//   private getSchema() {

//     const { tableDensity }: any = this.state
//     let avatarScale = 'scale(1,1)'
//     let fontSize = 'f5'
//     let avatarColumnWidth = 100
//     switch (tableDensity) {
//       case 'low': {
//         avatarScale = 'scale(0.9, 0.75)'
//         fontSize = 'f5'
//         avatarColumnWidth = 100
//         break
//       }
//       case 'medium': {
//         avatarScale = 'scale(0.82, 0.53)'
//         fontSize = 'f6'
//         avatarColumnWidth = 90
//         break
//       }
//       case 'high': {
//         avatarScale = 'scale(0.75, 0.32)'
//         fontSize = 'f7'
//         avatarColumnWidth = 75
//         break
//       }
//       default: {
//         avatarScale = 'scale(1,1)'
//         fontSize = 'f5'
//         avatarColumnWidth = 100
//         break
//       }
//     }
//     return {
//       properties: {
//         question: {
//           title: 'Question',
//         },
//         name: {
//           title: 'Name',
//         },
//         email: {
//           title: 'Email',
//           cellRenderer: ({ cellData }: any) => {
//             return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
//           },
//         },
//       },
//     }
//   }

//   private simpleInputObject({ values, onChangeObjectCallback }: any) {
//     return (
//       <Input
//         value={values || ''}
//         onChange={(e: any) => onChangeObjectCallback(e.target.value)}
//       />
//     )
//   }

//   private simpleInputVerbsAndLabel() {
//     return {
//       renderFilterLabel: (st: any) => {
//         if (!st || !st.object) {
//           // you should treat empty object cases only for alwaysVisibleFilters
//           return 'Any'
//         }
//         return `${
//           st.verb === '=' ? 'is' : st.verb === '!=' ? 'is not' : 'contains'
//         } ${st.object}`
//       },
//       verbs: [
//         {
//           label: 'is',
//           value: '=',
//           object: {
//             renderFn: this.simpleInputObject,
//             extraParams: {},
//           },
//         },
//         {
//           label: 'is not',
//           value: '!=',
//           object: {
//             renderFn: this.simpleInputObject,
//             extraParams: {},
//           },
//         },
//         {
//           label: 'contains',
//           value: 'contains',
//           object: {
//             renderFn: this.simpleInputObject,
//             extraParams: {},
//           },
//         },
//       ],
//     }
//   }

//   public render() {
//     const {
//       items,
//       searchValue,
//       filterStatements,
//       tableDensity,
//     }: any = this.state

//     const questions = this.getQuestions()
//     return (
//       <div>
//         TEST Beta
//         {console.log(questions)}
//         <Table
//           fullWidth
//           updateTableKey={tableDensity}
//           items={items}
//           schema={this.getSchema()}
//           density="low"
//           toolbar={{
//             density: {
//               buttonLabel: 'Line density',
//               lowOptionLabel: 'Low',
//               mediumOptionLabel: 'Medium',
//               highOptionLabel: 'High',
//               handleCallback: (density: string) =>
//                 this.setState({ tableDensity: density }),
//             },
//             inputSearch: {
//               value: searchValue,
//               placeholder: 'Search stuff...',
//               onChange: (value: string) =>
//                 this.setState({ searchValue: value }),
//               onClear: () => this.setState({ searchValue: null }),
//               onSubmit: () => {},
//             },
//             download: {
//               label: 'Export',
//               handleCallback: () => alert('Callback()'),
//             },
//             upload: {
//               label: 'Import',
//               handleCallback: () => alert('Callback()'),
//             },
//             fields: {
//               label: 'Toggle visible fields',
//               showAllLabel: 'Show All',
//               hideAllLabel: 'Hide All',
//             },
//             extraActions: {
//               label: 'More options',
//               actions: [
//                 {
//                   label: 'An action',
//                   handleCallback: () => alert('An action'),
//                 },
//                 {
//                   label: 'Another action',
//                   handleCallback: () => alert('Another action'),
//                 },
//                 {
//                   label: 'A third action',
//                   handleCallback: () => alert('A third action'),
//                 },
//               ],
//             },
//             newLine: {
//               label: 'New',
//               handleCallback: () => alert('handle new line callback'),
//             },
//           }}
//           filters={{
//             alwaysVisibleFilters: ['name', 'email'],
//             statements: filterStatements,
//             onChangeStatements: (newStatements: string) =>
//               this.setState({ filterStatements: newStatements }),
//             clearAllFiltersButtonLabel: 'Clear Filters',
//             collapseLeft: true,
//             options: {
//               name: {
//                 label: 'Name',
//                 ...this.simpleInputVerbsAndLabel(),
//               },
//               email: {
//                 label: 'Email',
//                 ...this.simpleInputVerbsAndLabel(),
//               },
//               streetAddress: {
//                 label: 'Street Address',
//                 ...this.simpleInputVerbsAndLabel(),
//               },
//               cityStateZipAddress: {
//                 label: 'City State Zip',
//                 ...this.simpleInputVerbsAndLabel(),
//               },
//             },
//           }}
//           bulkActions={{
//             texts: {
//               secondaryActionsLabel: 'Actions',
//               rowsSelected: (qty: any) => (
//                 <Fragment>Selected rows: {qty}</Fragment>
//               ),
//               selectAll: 'Select all',
//               allRowsSelected: (qty: any) => (
//                 <Fragment>All rows selected: {qty}</Fragment>
//               ),
//             },
//             totalItems: 100,
//             main: {
//               label: 'Send email',
//               handleCallback: (params: any) => alert('TODO: SHOW EMAIL FORM'),
//             },
//             others: [
//               {
//                 label: 'Reset avatar',
//                 handleCallback: (params: any) => console.warn(params),
//               },
//               {
//                 label: 'Delete',
//                 handleCallback: (params: any) => console.warn(params),
//               },
//             ],
//           }}
//         />
//       </div>
//     )
//   }
// }