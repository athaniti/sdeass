<?php

class Helper_Functions {



    /**
     * Storing new user
     * returns user details
     */
    public function getFulltextGrade($grade) {
      $ftgrade='';
      switch ($grade)
      {
      case '1':
          $ftgrade = 'Ένα';
          break;
          case '2':
              $ftgrade = 'Δύο';
              break;
              case '3':
                  $ftgrade = 'Τρία';
                  break;
                  case '4':
                      $ftgrade = 'Τέσσερα';
                      break;
                      case '5':
                          $ftgrade = 'Πέντε';
                          break;
                          case '6':
                              $ftgrade = 'Έξι';
                              break;
                              case '7':
                                  $ftgrade = 'Επτά';
                                  break;
                                  case '8':
                                      $ftgrade = 'Οκτώ';
                                      break;
                                      case '9':
                                          $ftgrade = 'Εννέα';
                                          break;

      case '10':
        $ftgrade = 'Δέκα';
        break;
      case '11':
          $ftgrade = 'Έντεκα';
        break;
      case '12':
          $ftgrade = 'Δώδεκα';
        break;
      case '13':
          $ftgrade = 'Δεκατρία';
        break;
      case '14':
          $ftgrade = 'Δεκατέσσερα';
        break;
      case '15':
          $ftgrade = 'Δεκαπέντε';
        break;
      case '16':
          $ftgrade = 'Δεκαέξι';
        break;
      case '17':
          $ftgrade = 'Δεκαεπτά';
        break;
      case '18':
          $ftgrade = 'Δεκαοκτώ';
        break;
      case '19':
          $ftgrade = 'Δεκαεννέα';
        break;
        case '20':
            $ftgrade = 'Είκοσι';
          break;
      default:
          $ftgrade = '';
      }

      return $ftgrade;

    }

    public function getFulltext2($grade) {
      $ftgrade='';
      switch ($grade)
      {
      case '1':
          $ftgrade = 'Πρώτα';
          break;
          case '2':
              $ftgrade = 'Δεύτερα';
              break;
              case '3':
                  $ftgrade = 'Τρίτα';
                  break;
                  case '4':
                      $ftgrade = 'Τέταρτα';
                      break;
                      case '5':
                          $ftgrade = 'Πέμπτα';
                          break;
                          case '6':
                              $ftgrade = 'Έκτα';
                              break;
                              case '7':
                                  $ftgrade = 'Έβδομα';
                                  break;
                                  case '8':
                                      $ftgrade = 'Όγδοα';
                                      break;
      default:
          $ftgrade = '';
      }

      return $ftgrade;

    }
	
	public function getFulltext2single($grade) {
      $ftgrade='';
      switch ($grade)
      {
      case '1':
          $ftgrade = 'Πρώτο';
          break;
          case '2':
              $ftgrade = 'Δεύτερο';
              break;
              case '3':
                  $ftgrade = 'Τρίτο';
                  break;
                  case '4':
                      $ftgrade = 'Τέταρτο';
                      break;
                      case '5':
                          $ftgrade = 'Πέμπτο';
                          break;
                          case '6':
                              $ftgrade = 'Έκτο';
                              break;
                              case '7':
                                  $ftgrade = 'Έβδομο';
                                  break;
                                  case '8':
                                      $ftgrade = 'Όγδοο';
                                      break;
      default:
          $ftgrade = '';
      }

      return $ftgrade;

    }

    public function getArthro($grade) {
      $ftgrade='Ο';
      switch ($grade)
      {
      case '2':
          $ftgrade = 'Η';
          break;
      default:
          $ftgrade = 'Ο';
      }

      return $ftgrade;

    }
	
	public function getArthro2($grade) {
      $ftgrade='ου';
      switch ($grade)
      {
      case '2':
          $ftgrade = 'ης';
          break;
      default:
          $ftgrade = 'ου';
      }

      return $ftgrade;

    }
	
	public function getKataliksi($grade) {
      $ftgrade='ενος';
      switch ($grade)
      {
      case '2':
          $ftgrade = 'ενη';
          break;
      default:
          $ftgrade = 'ενος';
      }

      return $ftgrade;

    }
}

?>
