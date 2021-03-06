<?php
/**
 * @author 
 * @date 
 * @year 
 * 
 * Decription ...  
 */

class Table_Buyings extends BaseTable {
	/**
	 * @var = Table_Buyings
	 */
	private static $uniqueInstance = null;
	
	protected $_name = 'Buyings';
	protected $_rowClass = 'Buying';
	
	/**
	 * @return Table_Buyings
	 */
	public function getInstance()
	{
		if(!self::$uniqueInstance){
			self::$uniqueInstance = new Table_Buyings();
		}
		return self::$uniqueInstance;
	}
	
	/**
	 * @param int $amount
	 * @return Zend_Db_Table_Rowset
	 */
	public function findRecent($amount = 10)
	{
		$select = $this->select()
			->order('bought_at DESC')
			->limit($amount);
		return $this->fetchAll($select);
	}

  /**
   *
   * @return Zend_Db_Table_Rowset
   */
  public function getAll(){
    $select = $this->select()
      ->order('bought_at DESC');

    return $this->fetchAll($select);
  }

  /**
   *
   * @return Zend_Paginator
   */
  public function getAllPageinaded(){
    $select = $this->select()
      ->order('bought_at DESC');

    $paginator = Zend_Paginator::factory($select);
    $paginator->setItemCountPerPage(1);
    return $paginator;
  }
}//endClass