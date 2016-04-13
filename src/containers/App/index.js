import 'inert-polyfill';
import React from 'react'
import { connect } from 'react-redux'
import './style' //local styles
import '../../styles/core'; //global styles
import '../../styles/fonts'; //fonts need to be loaded separately as css
import {Component as VectorEditor} from '../../../VectorEditor';
import CircularView from '../../../VectorEditor/CircularView';
import tidyUpSequenceData from 've-sequence-utils/tidyUpSequenceData';
import sequenceDataWithOrfsAndTranslations from '../../../exampleData/sequenceDataWithOrfsAndTranslations';
import sequenceDataWithOrfsAndTranslations2 from '../../../exampleData/sequenceDataWithOrfsAndTranslations2';

export class App extends React.Component {
  render () {
    var {currentPage} = this.props;
    return (
      <div className='container text-center'>
          <VectorEditor
              {...{
                // actionOverrides: restrictionDigest ? actionOverrides : undefined,
                sequenceData: tidyUpSequenceData(sequenceDataWithOrfsAndTranslations), 
                namespace: 'MainEditor', 
                // enzymeList: enzymesToShow,
                // disableEditorClickAndDrag: restrictionDigest,
                // annotationVisibility: {
                //   //only show custites if the user is doing a restriction digest
                // cutsites: restrictionDigest
                // }
            }}
              >
              <CircularView
                {... {
                    // componentOverrides: restrictionDigest 
                    //   ? {
                    //     SelectionLayer: SelectionLayerOverride,
                    //     Caret: CaretOverride,
                    //   } 
                    //  : undefined
                  }
                }
                />
          </VectorEditor>

      </div>
    )
  }
}

export default connect(
(state) => {
  return {
    currentPage: state.currentPage
  }
}, 
)(App)
